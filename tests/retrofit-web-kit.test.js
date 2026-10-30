'use strict';
/**
 * remedy-relationship-explorer — proof that the storage retrofit is real.
 *
 * The claim: the app's own store (LS) now delegates to web-kit's Loom.storage,
 * namespaced to "rre", and a user's existing "rre_<key>" data still loads.
 *
 * Tests passing is not the proof (PROMPTS/retrofit.md) - so this boots the REAL
 * page, drives the app's OWN toggleFav(), and then looks at what is actually in
 * localStorage. On the page before the retrofit every one of these fails,
 * because the app wrote "rre_fav" and never touched the kit.
 *
 *   node tests/retrofit-web-kit.test.js [path-to-app.html]
 *
 * No network, no build step: happy-dom only.
 */
const fs = require('fs');
const path = require('path');
const { Window } = require('happy-dom');

const file = process.argv[2] || path.join(__dirname, '..', 'app.html');
const html = fs.readFileSync(file, 'utf8');

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log('PASS  ' + name); }
  else { fail++; console.log('FAIL  ' + name + (detail ? '  [' + detail + ']' : '')); }
}

/* Boot the real page. happy-dom has no canvas and no real animation frames; both
 * are stubbed so the app's OWN code runs to completion instead of throwing at
 * the first getContext(). Nothing else is stubbed - the storage path is the
 * app's, not a mock of it. */
function boot(seed) {
  const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const bare = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const w = new Window({ url: 'https://local.test/' });
  w.document.write(bare);
  const ctx = new Proxy({}, { get: (t, k) => (k === 'canvas' ? null : () => {}) });
  w.HTMLCanvasElement.prototype.getContext = function () { return ctx; };
  w.requestAnimationFrame = function () { return 0; };
  for (const [k, v] of Object.entries(seed || {})) w.localStorage.setItem(k, v);
  for (const b of blocks) w.eval(b);
  return w;
}

const LEGACY = { rre_fav: JSON.stringify(['Arnica montana']), rre_notes: JSON.stringify({ 'Arnica montana': 'old note' }) };

/* ---- 1. an existing user keeps their data ---------------------------------- */
{
  const w = boot(LEGACY);
  let threw = null;
  try { w.toggleFav('Aconitum napellus'); } catch (e) { threw = e; }
  ok('the app\'s own toggleFav() runs without throwing', !threw, threw && threw.message);

  const stored = w.localStorage.getItem('rre:fav');
  const parsed = stored ? JSON.parse(stored) : null;
  ok('the app now WRITES through the kit (key "rre:fav" exists)', !!stored, 'keys: ' + JSON.stringify(Object.keys(w.localStorage).filter(k => k.indexOf('fav') >= 0)));
  ok('what it wrote is the whole set, not just the new star - the legacy "rre_fav" was READ',
     !!parsed && parsed.indexOf('Arnica montana') >= 0 && parsed.indexOf('Aconitum napellus') >= 0,
     JSON.stringify(parsed));
  ok('the legacy key is dropped once the value is safely under the namespaced one',
     w.localStorage.getItem('rre_fav') === null);

  /* ---- 2. the kit is genuinely the thing doing it ------------------------- */
  ok('web-kit is loaded in the page (window.Loom)', !!w.Loom);
  ok('the kit\'s store is namespaced to "rre"', !!(w.Loom && w.Loom.storage.prefix() === 'rre:'),
     w.Loom && w.Loom.storage.prefix());
  ok('the kit reads back exactly what the app wrote (JSON round-trip through the kit)',
     !!(w.Loom && JSON.stringify(w.Loom.storage.get('fav', null)) === stored),
     w.Loom && JSON.stringify(w.Loom.storage.get('fav', null)));

  /* ---- 3. a key nobody has written yet is NOT destroyed ------------------- */
  // The migration is per key, on write. A user who never edits their notes again
  // must still find them, so an untouched legacy key has to survive - the read
  // fallback (proved above on "fav") is what keeps it reachable.
  ok('a legacy key that has not been re-written is left alone, not wiped',
     w.localStorage.getItem('rre_notes') !== null,
     JSON.stringify(Object.keys(w.localStorage)));

  /* ---- 4. nothing regressed: the shared export/restore block is intact ---- */
  // The app exports through its own exportData(), which builds the JSON from the
  // state it hydrated out of the store and hands it to download(). Call that, and
  // capture what it would have written. The previous version of this check called
  // window.__exportAll(), a hook this app has never had - so it could never pass,
  // and it proved nothing about the retrofit either way.
  let threw2 = null, payload = null;
  try {
    if (typeof w.exportData !== 'function') throw new Error('exportData is missing');
    const realDownload = w.download;
    w.download = function (name, text) { payload = text; };
    w.exportData();
    w.download = realDownload;
  } catch (e) { threw2 = e; }
  ok('the "Save my data" export still runs, and carries the namespaced data',
     !threw2 && !!payload && payload.indexOf('Aconitum napellus') >= 0,
     threw2 ? threw2.message : (payload ? payload.slice(0, 60) : 'download() was never called'));
}

/* ---- 5. a fresh user (no legacy keys) writes only under the namespace ------ */
{
  const w = boot({});
  let threw = null;
  try { w.toggleFav('Belladonna'); } catch (e) { threw = e; }
  ok('a fresh install stores under "rre:" and creates no legacy key',
     !threw && !!w.localStorage.getItem('rre:fav') && w.localStorage.getItem('rre_fav') === null,
     threw ? threw.message : JSON.stringify(Object.keys(w.localStorage)));
}

console.log('\n' + pass + '/' + (pass + fail) + ' passed');
process.exit(fail ? 1 : 0);
