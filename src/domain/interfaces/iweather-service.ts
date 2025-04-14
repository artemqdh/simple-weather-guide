import { Weather, HourlyForecast } from '../models/weather';

export interface IWeatherService {
    GetWeatherFromAPI(): Promise<{ current: Weather; hourly: HourlyForecast[] }>;
    RenderTodayWeather(): void;
}