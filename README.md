Film Roulette - Android-ready Expo project (black & red theme)
=============================================================

What is included:
- App.js (React Native app)
- app.json (Expo config, dark theme, icon and splash set to assets/logo.png)
- eas.json (EAS build config for Android APK)
- build-android.sh (helper script to run eas build)
- assets/logo.png (your logo if provided)

How to build (no admin rights needed):
1. Create an Expo account (expo.dev) and GitHub repo or upload this project to GitHub.
2. Connect repo to Expo (Import from GitHub) and set TMDB_API_KEY in Project settings -> Environment variables.
3. Start a cloud build: Build -> Android -> APK -> Let Expo handle keystore -> Start build.
4. Download APK when build finishes and install on your Android device.

To test locally with Expo CLI (optional):
- Install Node.js and eas-cli (if you can): npm install -g eas-cli
- Run: bash build-android.sh
