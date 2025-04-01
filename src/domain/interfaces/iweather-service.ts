import { Weather } from '../models/weather'

export interface IWeatherService {
    GetWeatherFromAPI(): Promise<Weather>;
    RenderTodayWeather(): void;
}