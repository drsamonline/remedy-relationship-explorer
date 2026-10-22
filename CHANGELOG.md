# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [1.6.3] — 2026-10-22

### Fixed
- **The remedy card vanished the moment you moved the mouse toward it**, so you could never scroll it
  or click through to the reader. The card is now **pinned while the pointer is over it**, and moving
  toward it no longer dismisses it.
- Added a **keyboard shortcut**: with the card open, press **Enter** (or **F**) to open the full-text
  reader for that remedy. **Esc** closes the card.
- **Clicking the card** now opens the reader directly; the hint reads
  *"Click, or press Enter, to open the reader"* and the card shows a pointer cursor.

### Verified
- 6 card-interaction scenarios pass (hover, move-onto-card, Enter, F, click, Esc).
- 8 tooltip-state scenarios pass; 6 viewports clean; 54 functional checks pass.

## [1.6.2] — 2026-10-22

### Fixed
- **Switching Network → Focus left the graph in a broken state**, which also made the info card
  appear "not to work": a late Web Worker tick was overwriting the Focus layout with the Network
  positions (66 nodes, no centre), so the node under the cursor sat off-canvas. The worker's
  messages are now ignored unless we are genuinely in Network mode, and the worker is marked
  inactive the moment you leave. Verified over three Network↔Focus round-trips.
- Re-asserted the Focus layout on the next frame if it is ever found without a centre node.

### Verified
- 8 tooltip scenarios now pass (first hover, second hover, hide on leave, after search, after a
  modal, in Network mode, **back in Focus mode**, and keynote completeness vs data).
- 6 viewports (320–2560 px): no overflow, no clipping, no errors.
- 54 functional checks: all pass.

## [1.6.1] — 2026-10-22

### Fixed
- **The hover/tap card was still truncated** (it cut the keynote at 300 characters). It now shows the
  **complete** keynote, with the card scrollable and kept on screen. Confirmed: 1,100 characters
  shown for Aconitum, no ellipsis, on both desktop and mobile.
- **On touch devices the card vanished the instant it appeared** — the card's own `mouseleave`
  fired spuriously after a tap. Guarded.
- Tap an empty part of the graph to dismiss the card immediately.
- Stripped OCR page-break running heads that had leaked into the middle of keynotes.

### Verified
- 6 viewports (320–2560 px): no overflow, no clipping, no errors.
- 54 functional checks (desktop + mobile): all pass.

## [1.6.0] — 2026-10-22

### Fixed
- **Horizontal page scroll** — the hidden screen-reader table was widening the document on every
  screen size. It is now properly clipped.
- **The filters crushed the remedy panel** on short windows (a 768px-tall laptop left the panel
  ~38px tall, hiding the keynote). Filters are now collapsible everywhere and collapse by default
  when space is tight; the panel keeps a 240px minimum, so keynotes are visible at every size.
- The "Showing N most-connected…" note sat above the keynote and squeezed it out on small phones;
  it now sits at the foot of the panel.
- Very small screens (320px): shorter graph, compact header, fewer node labels to avoid overlap.

### Verified
- Audited at 320, 390, 768, 1024, 1440 and 2560 px: **no overflow, no clipping, no console errors,
  no failed requests**; the keynote is visible at every size.
- 52 functional checks (desktop + mobile) pass.

## [1.5.0] — 2026-10-22

### Fixed
- **The hover tooltip did nothing on touch devices** — there is no hover on a phone. Tapping a node
  now shows the same info card (guarded against the synthetic `mouseleave` that was wiping it).
- Tooltip is now a proper **short remedy card**: name, common name, kingdom, related count, source
  badges, a labelled **KEYNOTES · Boericke 1927** line with up to 300 characters, and a
  *Click for the full text* hint. It also flips to stay on screen near an edge.

### Added
- **Minimap** for the network view (Tools → Minimap) with a live viewport rectangle.
- **Curved edges** toggle for dense hubs (Tools → Curved edges).
- **Animated transitions** when hopping between remedies.
- **Screen-reader table** of every relationship for the selected remedy.
- 12 more OCR remedy-name variants merged, recovering keynotes.

### Data
- Keynotes now **652 of 670** remedies (was 653/686) — remaining gaps are remedies no source describes.

## [1.4.1] — 2026-10-22

### Added
- **Automatic installer builds.** GitHub Actions now compiles and publishes real binaries to
  [Releases](https://github.com/drsamonline/remedy-relationship-explorer/releases/latest):
  Windows `.exe` + `.msi` (Tauri), macOS `.dmg`, Linux `.AppImage` + `.deb`, and Android `.apk`
  (Capacitor). All built from the same single HTML file on every version tag.
- **Download section** in the README and on the landing page.

### Fixed
- Android CI failed at SDK setup (`sdkmanager` could not find package `tools`); the workflow now
  configures the SDK directly and installs `platforms;android-34` + `build-tools;34.0.0`.
- Desktop CI now generates app icons from a committed PNG and bundles with per-platform defaults.

## [1.4.0] — 2026-10-22

### Fixed
- **Keynotes were truncated.** The extractor capped them at ~210 characters, so every remedy showed
  only a fragment. Keynotes are now the full source passage (median 260, up to ~1,400 characters).
  Trailing page-header OCR artefacts are stripped.
- **No way to read the full keynote.** The keynote box now has a **⤢ Full text** button that opens a
  comfortable reader with *Copy text* and *Open remedy*.
- The first-run **tutorial never appeared** — the autostart had been inserted inside the JSON-import
  handler instead of the boot sequence. It now runs on first visit.

### Added
- **Guided tutorial** (7 steps) covering search, the two views, keynotes, shortlist & notebook export,
  and sources. Auto-runs on first visit; reopen any time from **Tools → Tutorial**.
- Clearer **start state** in the panel with *Try Sepia / Try Sulphur / Random remedy / ▶ Tutorial*.

## [1.3.0] — 2026-10-22

### Fixed
- **Mobile: the keynote was pushed below the fold.** The graph had a `min-height:44vh` floor that
  squeezed the panel. The graph is now shorter on phones (30vh floor) and the panel larger, so a
  remedy's keynotes are visible without scrolling.
- Mobile panel: compact header and pill rows; larger, more readable keynote box.

### Added
- **Rewritten Help panel** with step-by-step sections: *Shortlist & your notes*, *Export & print*,
  and *Where the books are* (source filter, chip superscripts B/C/H/A, corroborated-only, About).

## [1.2.1] — 2026-10-22

### Fixed
- **Service worker was cache-first with a fixed cache name, so updates never reached
  installed/live copies** — the app you saw could be an old build. Now network-first for HTML,
  versioned cache, and old caches are purged on activation.
- Tooltip keynote is more prominent (divider + brighter text); it is now a proper short remedy card.

### Added
- Version stamp (footer + About) and **Tools → Check for updates** (unregisters the service
  worker, clears caches, reloads).

## [1.2.0] — 2026-10-22

### Added
- **Fourth source: Allen's *Keynotes and Characteristics with Comparisons* (1898)** — 584 relationships
  across 59 leading remedies. Corroborated (≥2 books) relationships rose from 807 to **928**.
- **Visible dark-mode toggle** in the top bar (sun/moon), alongside the light/dark/auto theme option.

### Changed
- Dataset now **686 remedies / 7,786 relationships**; source filter, chips and citations include Allen (A).

## [1.1.0] — 2026-10-22

### Added
- Rich hover tooltip: name, common name, kingdom, related count, source badges and a keynote snippet.
- System-aware theme (auto light/dark), plus an explicit high-contrast theme.
- Adjustable text size.
- Recent searches, remembered between sessions.
- Print an entire shortlist (not just one remedy) and copy a formatted citation.
- Vector **SVG export** of the current graph.
- **Colour by** relationship type, kingdom, community cluster, or plant genus.
- Community detection (label propagation) for the network view.
- **Query expressions** in search: "complementary to Sepia", "inimical to Lachesis and complementary to Sulphur".
- Three quiz modes: which-remedy, what-relationship, which-is-related.
- Flashcards generated from keynotes.
- **Export / import your data** (shortlist, notes, preferences) as a single JSON file.
- First-run onboarding tour.
- Light stemming in symptom search (itching → itch).
- Force layout moved to a **Web Worker** where available, with a main-thread fallback.

## [1.0.0] — 2026-10-22

### Added
- Focus view (radial ego graph) with drill-down and breadcrumb navigation.
- Network view (force-directed) with detail slider and collision-aware layout.
- Full-text search over remedy names **and** keynotes.
- Keynotes for 653 remedies, sourced from Boericke or Clarke.
- Filters: relationship type, kingdom, source book, and "corroborated only".
- Per-relationship source provenance (B / C / H superscripts).
- Compare two remedies (shared / exclusive / Jaccard).
- Shortest path between two remedies.
- Quiz mode, study notebook (Markdown export), copy-to-clipboard.
- PNG export and printable remedy sheet.
- Light/dark theme, colour-blind-safe palette with dashed edge patterns.
- Deep-linkable URLs, keyboard shortcuts, screen-reader support.
- Responsive layout for phone, tablet and large desktop.
- PWA manifest + service worker; Tauri (Windows) and Capacitor (Android) build configs.
- Three public-domain data sources merged with provenance.

### Fixed
- Canvas could desync from its container (stretched rendering) when the mobile URL bar
  or layout changed — now handled by a ResizeObserver.
- Network nodes overlapped into a blob — radii reduced and collision resolution added.
- Major remedies (Pulsatilla, Lycopodium, Mercurius…) had lost their keynotes in the merge.
- Duplicate and OCR-variant remedy names not being unified.

[1.0.0]: https://github.com/drsamonline/remedy-relationship-explorer/releases/tag/v1.0.0
