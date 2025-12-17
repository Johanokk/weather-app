# Weather App

This mobile app fetches weather from the OpenWeatherMap free API and displays a small analysis (cold/hot/windy) based on the response.

Quick start (Windows PowerShell):

```powershell
cd "C:\Users\okkon\Koulu\Webhybmobiili\weather-app"
npm install
# Option A: set env var for Expo in the current shell
$env:EXPO_PUBLIC_WEATHER_API_KEY="<your_api_key_here>"
npm start

# Option B: if you need to supply the API key for Moodle, paste it into `API_KEY_FOR_MOODLE.txt`
# then set the environment variable from that file before starting the app:
$key = (Get-Content .\API_KEY_FOR_MOODLE.txt) -match 'API_KEY=(.*)' | Out-Null; $env:EXPO_PUBLIC_WEATHER_API_KEY=$Matches[1]
npm start
```

Notes:
- The app code expects `EXPO_PUBLIC_WEATHER_API_KEY` in the environment.
- `API_KEY_FOR_MOODLE.txt` is included locally for submission and is listed in `.gitignore` to avoid accidental push.
