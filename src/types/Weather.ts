export interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
  wind: { speed: number };
}
