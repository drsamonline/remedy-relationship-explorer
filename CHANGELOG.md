# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/).

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
