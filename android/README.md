# 📱 Building the KEA Prep Android App

## Quick Build (3 Steps)

### 1. Clone & Open in Android Studio
```bash
git clone https://github.com/modernnavi-star/KEA-.git
```
Open **Android Studio** → Open Project → Select `KEA-/android/` folder

### 2. Let Gradle Sync
Android Studio will automatically download dependencies (appcompat, material, swiperefreshlayout). Wait for sync to complete (~2-3 mins first time).

### 3. Build APK
- **Menu:** Build → Build Bundle(s) / APK(s) → Build APK(s)
- **Output:** `android/app/build/outputs/apk/debug/app-debug.apk`
- Install on your phone!

---

## Manual Build (Without Android Studio)

### Requirements
- JDK 17+
- Android SDK (platform 34)
- Gradle 8.2

### Steps
```bash
cd android
./gradlew assembleDebug
# APK at: app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 App Features

| Feature | Description |
|---------|-------------|
| **Splash Screen** | Branded KEA Prep splash on launch |
| **WebView Container** | Loads the full study app from GitHub Pages |
| **Pull to Refresh** | Swipe down to reload content |
| **Offline Fallback** | Shows friendly message when offline |
| **Back Button** | Proper WebView back navigation |
| **Material Design** | Clean, modern Android look |
| **External Links** | Opens external URLs in browser |

---

## 🔧 Customization

### Change the App URL
Edit `app/src/main/java/com/kea/prep/MainActivity.java`:
```java
private static final String LIVE_URL = "https://modernnavi-star.github.io/KEA-/";
```

### Change App Name
Edit `app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">KEA Group C Prep</string>
```

### Update App Icon
Replace files in `app/src/main/res/mipmap-*/` with your own PNG icons.

---

## 📦 Release Build (Play Store Ready)
```bash
cd android
./gradlew assembleRelease
# Sign the APK:
# jarsigner -keystore your-key.keystore app-release-unsigned.apk alias
# zipalign -v 4 app-release-unsigned.apk KEA-Prep.apk
```

---

## 🎯 Architecture
```
android/
├── build.gradle              # Root build config
├── settings.gradle            # Module settings
├── gradle.properties          # Gradle properties
├── app/
│   ├── build.gradle           # App dependencies
│   ├── proguard-rules.pro     # Minification rules
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/kea/prep/
│       │   ├── SplashActivity.java   # Splash screen (1.5s)
│       │   └── MainActivity.java     # WebView container
│       └── res/
│           ├── layout/
│           │   ├── activity_main.xml
│           │   └── activity_splash.xml
│           ├── values/
│           │   ├── styles.xml
│           │   ├── colors.xml
│           │   └── strings.xml
│           ├── drawable/
│           │   ├── ic_launcher_background.xml
│           │   └── ic_launcher_foreground.xml
│           └── mipmap-*/              # App icons
```
