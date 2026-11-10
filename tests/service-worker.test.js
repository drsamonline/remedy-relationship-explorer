'use strict';
/**
 * Every service worker must precache files that exist.
 *
 *   node tests/service-worker.test.js
 *
 * `cache.addAll(CORE)` rejects on the first 404 and the register() call that
 * follows is wrapped in .catch(()=>{}), so a stale CORE entry means the app
 * silently has no offline cache at all. That is what `app.html` was: a file in
 * two CORE lists and in neither directory.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let pass = 0, fail = 0;
const ok = (n, c, d) => { c ? (pass++, console.log('PASS  ' + n)) : (fail++, console.log('FAIL  ' + n + (d ? '  [' + d + ']' : ''))); };

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'sw.js') out.push(p);
  }
  return out;
}

const workers = walk(root, []);
ok('the repository has service workers to check', workers.length > 0, workers.length);

for (const file of workers) {
  const rel = path.relative(root, file);
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/const CORE = \[([^\]]*)\]/);
  if (!m) { ok(rel + ': has a CORE list', false); continue; }
  const entries = m[1].split(',').map((x) => x.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  const dir = path.dirname(file);
  const missing = entries.filter((e) => e !== './' && !fs.existsSync(path.join(dir, e)));
  ok(rel + ': every precached file exists beside it', missing.length === 0, missing.join(', '));

  const v = src.match(/const VERSION = '([^']+)'/);
  ok(rel + ': carries a cache VERSION', !!v, v && v[1]);
}

console.log('\n' + (fail === 0 ? 'service workers: OK' : fail + ' failed'));
process.exit(fail === 0 ? 0 : 1);
