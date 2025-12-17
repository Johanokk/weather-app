import { WeatherResponse } from "../types/Weather";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  if (!API_KEY) {
    throw new Error(
      "Missing API key: set EXPO_PUBLIC_WEATHER_API_KEY in your environment"
    );
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);

  let body: any = null;
  try {
    body = await res.json();
  } catch (e) {
    throw new Error(`Failed to parse response: ${String(e)}`);
  }

  if (!res.ok) {
    const msg = body && (body.message || JSON.stringify(body));
    throw new Error(`API error ${res.status}: ${msg}`);
  }

  return body as WeatherResponse;
}
