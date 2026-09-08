# Android BackHandler is not invoked with `enableOnBackInvokedCallback=true` (API 35, target SDK 36)

This repository was created from React Native's official [reproducer template](https://github.com/react-native-community/reproducer-react-native). It is a minimal React Native Community CLI application: one screen, `View`, `Text`, and one `BackHandler` listener. It contains no Expo, React Navigation, `react-native-screens`, or bottom-sheet dependency.

## Reported failing configuration

| Field | Value |
| --- | --- |
| React Native | 0.87.1 |
| Device | Pixel 8 Pro emulator, API 35 |
| compile SDK | 37 |
| target SDK | 36 |
| `android:enableOnBackInvokedCallback` | `true` |
| Input | System navigation-bar Back button |
| Actual result | Count remains 0; Android returns to the home screen |

Confirmed in this repository at commit `1c6fd8c` on a Pixel 8 Pro emulator / Android API 35: pressing the system navigation-bar Back button leaves `Back count: 0`, emits no `hardwareBackPress received` log, and returns to the home screen. This template-derived build also passes automated test, lint, and APK-manifest verification.

The listener logs `hardwareBackPress received`, increments the displayed count, returns `true`, and removes its subscription on unmount. Expected behavior is that the count increments and the app remains visible.

## Run

1. Install the exact dependency tree and start Metro:

   ```sh
   cd ReproducerApp
   corepack yarn install --frozen-lockfile
   corepack yarn start
   ```

2. In another terminal, build and install the APK:

   ```sh
   cd ReproducerApp/android
   ./gradlew :app:assembleDebug
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```

3. On a Pixel 8 Pro emulator / API 35, open the app and press the system navigation-bar Back button. The reproduction is successful if `Back count` remains `0`, no `hardwareBackPress received` log is emitted, and Android returns to the home screen.

The predictive-Back gesture was not tested.

## Earlier control result

On the same Pixel 8 Pro emulator / API 35 with React Native 0.85.3 and target SDK 36: the app fails with the flag `true`, and passes (count increases; app remains visible) after changing only the flag to `false`.
