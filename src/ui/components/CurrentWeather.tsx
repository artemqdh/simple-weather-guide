import React from 'react';
import { Weather } from '../../domain/models/weather'

export const CurrentWeather: React.FunctionComponent<{ weather: Weather }> = ({ weather }) => {

  let date = Date.now();
  let dateNow = new Date(date).toLocaleDateString('ru-RU');

  let sunrise = new Date(weather.sunrise).toLocaleTimeString('ru-RU');

  let sunset = new Date(weather.sunset).toLocaleTimeString('ru-RU');

  return (
    <div className='bg-light'>
      <div className="row">
        <div className='col-md-6'>
          <h4 className='m-3 text-primary'><b>CURRENT WEATHER</b></h4>
        </div>
        <div className='col-md-6 d-flex justify-content-end'>
          <h4 className='m-3 text-primary'><b>{dateNow}</b></h4>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="WeatherIcon" />
          <p>{weather.weatherConditions}</p>
        </div>
        <div className="col-md-4 text-center">
          <h2><b>{weather.temperatureCelsius} °C</b></h2>
          <p>Real Feel {weather.realFeel}</p>
        </div>
        <div className="col-md-4 text-center">
          <p>Sunrise: {sunrise} AM</p>
          <p>Sunset: {sunset} PM</p>
        </div>
      </div>
    </div>
  )
}

