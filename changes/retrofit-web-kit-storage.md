---
bump: patch
---

Storage now goes through web-kit. The app vendored `web-kit.js` and never called it;
`LS` delegates to `Loom.storage.namespace("rre")`, keeping `LS` as the app's own API so
no call site changed. Keys written before this are still read (`rre_<key>`) and are
dropped only once their value has landed under the namespaced key, so nobody's
shortlist, notes or preferences are orphaned. If the kit is missing, the raw
localStorage path still runs - guarded, not removed.
