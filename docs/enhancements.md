# Enhancement backlog

## Done (v1.1.0 – v1.2.0)
- Rich tooltip with a short remedy detail box (keynote snippet, related count, source badges).
- System-aware theme, high-contrast theme, adjustable text size.
- Recent searches; light stemming in search.
- Query expressions ("complementary to X and inimical to Y").
- Colour by type / kingdom / cluster / family; community detection.
- SVG (vector) export; print whole shortlist; copy citation.
- Flashcards; three quiz modes.
- Export / import all personal data as JSON.
- First-run onboarding tour.
- Web Worker for the force layout.
- **Fourth source added: Allen's Keynotes with Comparisons** (+584 relationships, corroboration 807→928).
- Visible dark-mode toggle.
- **Full-length keynotes** (no truncation) + a full-text reader with copy.
- **7-step guided tutorial** (auto-runs on first visit) and a clearer start state.
- Cleaner start state with example actions.
- **Tooltip works on touch** (tap) and is a labelled short remedy card.
- **Minimap**, **curved edges**, **animated hop transitions**, **screen-reader relationship table**.
- 12 more OCR name variants merged; keynotes 652/670.

## Still open (all offline)

Every idea here runs entirely on-device: no server, no backend, no network call at runtime.

## Data
- Add further public-domain sources (Farrington, Hughes, Boenninghausen, Kent's appendix).
- Recover the remaining OCR-corrupt relationships via better scans or a review pass.
- Keynotes for the ~30 remedies still without one.
- Remedy families / botanical & mineral groups as an extra relationship dimension.
- Miasm and constitution tags; potency and duration-of-action notes.
- Synonyms, common names and multilingual remedy names.
- Directional antidote edges ("A antidotes B" vs "A is antidoted by B").
- Grade/strength per relationship where the source prints one.

## Graph & visualisation
- Cluster/community detection — auto-group remedies into families and colour by cluster.
- Timeline view of when relationships were first recorded.
- Curved edges / edge bundling for dense hubs.
- Minimap for the network view.
- Fisheye focus-plus-context.
- Animated transitions between focus hops.
- Pin/freeze nodes.
- Export the graph as SVG (vector) as well as PNG.
- Filter the graph by kingdom/family directly on the canvas.

## Search & discovery
- Ranked symptom search with synonyms and stemming.
- Search within a remedy's own relationships.
- "Remedies that are complementary to X and inimical to Y" — query expressions.
- Fuzzy/typo-tolerant matching everywhere.
- Recent searches; saved searches.

## Study & clinical
- Spaced-repetition flashcards built from keynotes.
- Full quiz modes: which-remedy, which-type, odd-one-out, from-keynote.
- Case notes: attach a shortlist and notes to a named case, export as a file.
- Multiple notebooks; notebook import/export (JSON) for moving between devices by file.
- Cross-remedy comparison table export.
- Annotation/comment layer with a personal tag vocabulary.
- "Never well since" / causation note fields.

## Interface
- Light/dark/system theme (system auto-detect).
- Adjustable base font size; dyslexia-friendly option.
- Print stylesheet for a whole shortlist, not just one remedy.
- Onboarding tour.
- Custom colour themes.

## Technical / performance
- Web Worker for the force layout to keep the UI perfectly smooth.
- Offscreen-canvas caching of static layers.
- Compress the embedded dataset (brotli) with client-side decompression.
- Tree-shake and minify the build; ship a smaller file.
- Optional multi-file mode (code + data split) for faster repeat loads.
- WebGL renderer for very large graphs.

## Accessibility
- Full keyboard graph traversal (arrow keys around the ring).
- Screen-reader data-table fallback for the graph.
- High-contrast theme.
- Reduced-motion mode (already partially supported).

## Portability
- Optional encrypted local vault for notes (passphrase-protected, still offline).
- Import/export the whole state (notes + shortlist + prefs) as a single file.
- QR-code transfer of a remedy link between devices.
- PWA offline install polish and update prompts.
- Desktop builds for Linux/ARM; Android tablet layouts.

## Deliberately out of scope (would need a server)
Accounts and sync, cloud backup, crowdsourced corrections, usage analytics, a public API.
Where a similar benefit is possible offline, it is done by file export/import instead.
