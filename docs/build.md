# Building the desktop and mobile apps

The app itself is a single HTML file (`app.html`). The desktop and mobile builds simply wrap that
file — there is no separate codebase.

> These builds are produced by GitHub Actions (see `.github/workflows/`). They are **not**
> built on every commit — they run on a version tag (`v*`) or manually.

## Windows / macOS / Linux — Tauri

Wraps `app.html` in a native webview. Produces a small `.exe` (NSIS/MSI), `.dmg` and AppImage/deb.

```bash
cd desktop
npm install
mkdir -p web && cp ../app.html web/index.html
npm run build          # or: npx tauri build
```

Requires Rust and (on Windows) the WebView2 runtime.

## Android — Capacitor

```bash
cd mobile
npm install
mkdir -p www && cp ../app.html www/index.html
npx cap add android
npx cap sync android
npx cap open android    # then Build > Build APK(s)
```

Requires JDK 17 and the Android SDK.

## Progressive Web App

Open the live demo in Chrome or Edge and choose **Install app**. The service worker
(`sw.js`) caches the app so it keeps working offline.

## Why the binaries aren't in the repo

Build artefacts are large and platform-specific. They are attached to
[Releases](https://github.com/drsamonline/remedy-relationship-explorer/releases) by CI.
