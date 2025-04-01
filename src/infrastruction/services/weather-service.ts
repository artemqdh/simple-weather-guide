import { IWeatherService } from '../../domain/interfaces/iweather-service';
import { Weather } from '../../domain/models/weather';
import axios from 'axios';

export class WeatherService implements IWeatherService {
  public  async GetWeatherFromAPI(): Promise<Weather> {
        const currentLocation = new Map();
        currentLocation.set("currentLatitude", 50.36);
        currentLocation.set("currentLongitude", 36.36);

        const apiKey = process.env.REACT_APP_API_KEY;

        if (!apiKey) {
            throw new Error("API ключ не задан!");
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.get("currentLatitude")}&lon=${currentLocation.get("currentLongitude")}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get<any>(apiUrl);
            const dataFromWeatherAPI = response.data;

            const weatherData: Weather = {
                temperatureCelsius: dataFromWeatherAPI.main.temp,
                cityName: dataFromWeatherAPI.sys.country
            };
            return weatherData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.message);
                if (error.response) {
                    console.error('Status:', error.response.status);
                    console.error('Data:', error.response.data);
                }

            } else {

                console.error('Error:', error);
            }
            throw error;
        }
    }

   public RenderTodayWeather(): void {

    }
}