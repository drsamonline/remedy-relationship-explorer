# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/).

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
