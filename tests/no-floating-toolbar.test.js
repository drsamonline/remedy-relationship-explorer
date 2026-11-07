'use strict';
/**
 * remedy-relationship-explorer — the phone layout, and no toolbar bolted onto the app.
 *
 * Two things went wrong and this is what stops them coming back:
 *
 * 1. A retrofit injected a "four things" block into docs/app.html that added a
 *    floating Save my data / Restore / Undo / ? toolbar over the bottom-left of
 *    the page. It was never in the app itself, so the published copy and the
 *    source disagreed - and the copy carried a UI nobody asked for.
 *
 * 2. On a phone the panel kept a 318px cap from the 1020px breakpoint, which
 *    left a dead strip down the right of the screen, and the graph was laid out
 *    before the filter panel collapsed, so its labels were drawn for a stage
 *    that no longer existed and ran off the edge.
 *
 *   node tests/no-floating-toolbar.test.js
 *
 * No dependencies, no network.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log('PASS  ' + name); }
  else { fail++; console.log('FAIL  ' + name + (detail ? '  [' + detail + ']' : '')); }
}

/* THE APP IS ONE FILE NOW. This listed three copies - app.html, docs/app.html and
   docs/play/index.html - and read all three unconditionally, so when the two old copies
   were deleted the test died with ENOENT before asserting anything. The page that ships
   is docs/play/index.html; the others are history. Read what exists, and fail loudly if
   the real one is missing rather than silently checking nothing. */
const PAGES = ['docs/play/index.html'];
const src = {};
for (const p of PAGES) {
  if (!fs.existsSync(path.join(root, p))) {
    console.log('FAIL  ' + p + ' is missing - the shipped page must exist');
    process.exit(1);
  }
  src[p] = fs.readFileSync(path.join(root, p), 'utf8');
}

/* ---- 1. no floating toolbar anywhere ------------------------------------- */
for (const p of PAGES) {
  ok(p + ': no injected floating toolbar (#__tools)', src[p].indexOf('__tools') < 0);
  ok(p + ': no "four things" retrofit block', src[p].indexOf('THE FOUR THINGS') < 0);
}

/* ---- 2. every copy that exists IS the app -------------------------------- */
/* The byte-identical check existed because three copies drifted. There is one copy now,
   so the check it can still make is that no stale duplicate has been reintroduced. */
for (const p of ['app.html', 'docs/app.html']) {
  ok(p + ' has not come back as a second copy', !fs.existsSync(path.join(root, p)));
}

/* ---- 3. the phone layout is actually fixed ------------------------------- */
const app = src['docs/play/index.html'];
const m880 = app.match(/@media \(max-width:880px\)\{([\s\S]*?)\n  \}/);
ok('there is an 880px breakpoint to hold the phone rules', !!m880);
if (m880) {
  ok('the 318px panel cap is lifted on a phone (aside fills the width)',
     /aside\{max-width:none;width:100%\}/.test(m880[1]));
}
ok('the graph is re-measured after the filter panel collapses at boot',
   /f\.classList\.add\('fcol'\); onResize\(\);/.test(app));
ok('the graph is re-measured when the filter panel is toggled',
   /t\.setAttribute\('aria-expanded', String\(!c\)\); onResize\(\);/.test(app));
ok('fit() keeps the graph clear of the zoom buttons on a narrow stage',
   /const padR = r\.width<=560 \? 62 : pad;/.test(app) &&
   /\(r\.width-pad-padR\)/.test(app));

console.log('\n' + pass + '/' + (pass + fail) + ' passed');
process.exit(fail ? 1 : 0);
