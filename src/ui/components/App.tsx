import React, { useState, useEffect } from 'react';
import { WeatherService } from '..//..//infrastruction/services/weather-service';
import { CurrentWeather } from './CurrentWeather';
import PrintHourlyContainer from './HourlyPrint';
import { Weather, HourlyForecast } from '..//..//domain/models/weather';
import NavigationBar from "./NavigationBar";

export const App: React.FunctionComponent = () => {
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [page, setPage] = useState<'today' | 'forecast'>('today');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const weatherService = new WeatherService();
    try
    {
      const { current, hourly } = await weatherService.GetWeatherFromAPI();
      setCurrentWeather(current);
      setHourlyForecast(hourly);
    }
    catch (err)
    {
      setError("Failed to fetch weather data. Please try again.");
    }
    finally
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading weather data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!currentWeather) return <p className="text-center">No weather data available</p>;

  return (
    <>
      <NavigationBar onChangePage={setPage} />
      
      {page === 'today' && (
        <>
          <CurrentWeather weather={currentWeather} />
          <PrintHourlyContainer hourlyData={hourlyForecast} />
        </>
      )}

      {page === 'forecast' && (
        <>
          Hello test
        </>
      )}
      
    </>
  );
};

export default App;
