import { Weather, HourlyForecast } from '../../domain/models/weather';
import axios from 'axios';

export class WeatherService {
  public async GetWeatherFromAPI(): Promise<{ current: Weather; hourly: HourlyForecast[] }> {
    try {
      const currentLatitude = 50.36;
      const currentLongitude = 36.36;

      const apiKey = process.env.REACT_APP_API_KEY;
      if (!apiKey) {
        throw new Error('API key not set!');
      }

      const currentResponse = await axios.get<{
        main: { temp: number; feels_like: number };
        name: string;
        weather: Array<{ main: string; icon: string }>;
        wind: { speed: number };
        sys: { country: string; sunrise: number; sunset: number };
      }>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`
      );

      const forecastResponse = await axios.get<{
        list: Array<{
          dt: number;
          main: { temp: number; feels_like: number };
          weather: Array<{ main: string; icon: string }>;
          wind: { speed: number };
        }>;
      }>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`
      );

      const dataFromWeatherAPI = currentResponse.data;

      const currentWeather: Weather = {
        temperatureCelsius: dataFromWeatherAPI.main.temp,
        realFeel: dataFromWeatherAPI.main.feels_like,
        cityName: dataFromWeatherAPI.sys.country,
        sunrise: dataFromWeatherAPI.sys.sunrise,
        sunset: dataFromWeatherAPI.sys.sunset,
        weatherConditions: dataFromWeatherAPI.weather[0].main,
        icon: dataFromWeatherAPI.weather[0].icon
      };

      const hourlyForecasts = this.generateHourlyData(forecastResponse.data.list);

      return {
        current: currentWeather,
        hourly: hourlyForecasts
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
        }
      } else {
        console.error('Error fetching weather:', error);
      }
      throw error;
    }
  }

  private generateHourlyData(threeHourData: any[]): HourlyForecast[] {
    if (!threeHourData?.length) {
      throw new Error('No forecast data');
    }

    const nextForecasts = threeHourData.slice(0, 6);

    return nextForecasts.map(item => {
      const date = new Date(item.dt * 1000);
      return this.createHourlyForecast(item, date.getHours());
    });
  }

  private createHourlyForecast(data: any, hour: number): HourlyForecast {
    return {
      time: hour,
      temperatureCelsius: Math.round(data.main.temp * 10) / 10 || 0,
      forecast: data.weather[0]?.main || 'N/A',
      realFeelCelsius: Math.round(data.main.feels_like * 10) / 10 || 0,
      windSpeed: Math.round(data.wind.speed * 3.6 * 10) / 10 || 0, // m/s to km/h
      icon: data.weather[0]?.icon || '01d'
    };
  }
}
