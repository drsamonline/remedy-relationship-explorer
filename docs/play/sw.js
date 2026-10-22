/* Remedy Relationship Explorer — offline cache
   Strategy: network-first for HTML (so updates land), cache-first for static assets.
   Bump VERSION on every release so old caches are purged. */
const VERSION = 'rre-v3';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'assets/icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => Promise.all(
      CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))
    )).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHTML(req) {
  return req.mode === 'navigate' ||
    req.destination === 'document' ||
    (req.headers.get('accept') || '').includes('text/html') ||
    /\.html?$/.test(new URL(req.url).pathname);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (isHTML(req)) {
    // network-first: always try for the newest build, fall back to cache offline
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match('index.html')))
    );
    return;
  }

  // stale-while-revalidate for assets
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
