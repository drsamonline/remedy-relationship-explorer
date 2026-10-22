# Android build (Capacitor)

Wraps the single-file app in a native Android WebView.

```bash
npm install
npm run add:android     # creates the android/ project (first time only)
npm run sync
npm run open            # then Build > Build APK(s) in Android Studio
```

Requires JDK 17 and the Android SDK. CI builds the APK on release tags.
