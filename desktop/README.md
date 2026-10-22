# Desktop build (Tauri)

Wraps the single-file app in a native webview (Windows/macOS/Linux).

```bash
npm install
npm run build      # prep (copies ../app.html to web/) then `tauri build`
```

Icons are generated in CI from `../assets/icon.svg` via `npx tauri icon`. To build locally,
run that once first so `src-tauri/icons/` exists.
