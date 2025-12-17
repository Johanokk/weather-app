import { WeatherResponse } from "../types/Weather";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API error: ${res.status} ${text}`);
  }

  return res.json();
}
