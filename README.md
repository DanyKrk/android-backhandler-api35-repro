# Android BackHandler API 35 reproduction

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

The result above was manually confirmed in an equivalent bare Community CLI RN 0.87.1 application. This template-derived build passes automated test, lint, and APK-manifest verification. Run the manual step below once before filing the issue, to confirm the result in this exact repository.

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

3. On API 35, open the app and press the system navigation-bar Back button.

The predictive-Back gesture was not tested.

## APK verification

```sh
"$ANDROID_HOME/build-tools/37.0.0/aapt" dump badging \
  ReproducerApp/android/app/build/outputs/apk/debug/app-debug.apk | grep targetSdkVersion
"$ANDROID_HOME/build-tools/37.0.0/aapt" dump xmltree \
  ReproducerApp/android/app/build/outputs/apk/debug/app-debug.apk AndroidManifest.xml \
  | grep enableOnBackInvokedCallback
```

Expected packaged values: `targetSdkVersion:'36'` and `enableOnBackInvokedCallback=true`.

## Earlier control result

On the same Pixel 8 Pro emulator / API 35 with React Native 0.85.3 and target SDK 36: the app fails with the flag `true`, and passes (count increases; app remains visible) after changing only the flag to `false`.
