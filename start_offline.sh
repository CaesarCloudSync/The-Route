# Starting Expo Go Offline
adb devices
npx expo start --localhost
adb reverse tcp:8081 tcp:8081
# Then use expo app.