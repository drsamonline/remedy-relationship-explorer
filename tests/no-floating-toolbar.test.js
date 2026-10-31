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

const PAGES = ['app.html', 'docs/app.html', 'docs/play/index.html'];
const src = {};
for (const p of PAGES) src[p] = fs.readFileSync(path.join(root, p), 'utf8');

/* ---- 1. no floating toolbar anywhere ------------------------------------- */
for (const p of PAGES) {
  ok(p + ': no injected floating toolbar (#__tools)', src[p].indexOf('__tools') < 0);
  ok(p + ': no "four things" retrofit block', src[p].indexOf('THE FOUR THINGS') < 0);
}

/* ---- 2. the published copies ARE the app --------------------------------- */
for (const p of PAGES.slice(1)) {
  ok(p + ' is byte-identical to app.html', src[p] === src['app.html'],
     'differs by ' + Math.abs(src[p].length - src['app.html'].length) + ' bytes');
}

/* ---- 3. the phone layout is actually fixed ------------------------------- */
const app = src['app.html'];
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
