import { Weather } from '../models/weather'

export interface IWeatherService {
    GetWeatherFromAPI(): Weather;
    RenderTodayWeather(): void;
}