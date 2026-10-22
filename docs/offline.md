# Offline by design

The app has **no server, no backend, and makes no network requests at runtime**.

## Why this matters

- **Portable** — one HTML file carries both code and data.
- **Private** — nothing leaves the device. No accounts, analytics, cookies or telemetry.
- **Durable** — no API to deprecate, no hosting bill, no outage.
- **Fast** — everything is local; there is no round trip.

## How it is achieved

| Need | How it is met offline |
|---|---|
| Data | Embedded in the file as JSON. |
| Search | In-browser full-text index; no search service. |
| Layout | Force-directed simulation computed in-browser. |
| Notes & shortlist | `localStorage`. |
| AI features | None required — the "intelligence" is graph algorithms and set operations. |
| Updates | Ship a new file. |

## Consequences

Anything that would need a server is deliberately out of scope: user accounts and sync, shared
datasets, cloud backup, crowdsourced corrections and analytics. See `enhancements.md` for
offline-only ways to approach some of these.
