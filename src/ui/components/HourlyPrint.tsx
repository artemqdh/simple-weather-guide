import React from 'react';
import { HourlyForecast } from '../../domain/models/weather';

function PrintHourlyContainer({ hourlyData }: { hourlyData: HourlyForecast[] })
{
  return (
    <div>
      <div className="p-2 bg-light mt-3">
        <h4 className="p-2 ms-2 text-primary">
          <b>HOURLY FORECAST</b>
        </h4>
        <div>
          <div className="row m-3 pt-2">
            <div className="col headers-labels">
              <p style={{ paddingBottom: 117 }}><b>TODAY</b></p>
              <p>Forecast</p>
              <p>Temp (°C)</p>
              <p>RealFeel</p>
              <p>Wind (km/h)</p>
            </div>

            {hourlyData.map((hour, index) => (
              <div className="col time-column" key={index}>
                <p><b>{hour.time % 12 === 0 ? 12 : hour.time % 12} {hour.time >= 12 ? 'pm' : 'am'}</b></p>
                <p>
                  <img src={`https://openweathermap.org/img/wn/${hour.icon}@4x.png`} alt={hour.forecast} style={{ width: '100px', height: '100px', objectFit: 'contain'}}/>
                </p>
                <p>{hour.forecast}</p>
                <p>{Math.round(hour.temperatureCelsius)}°</p>
                <p>{Math.round(hour.realFeelCelsius)}°</p>
                <p>{Math.round(hour.windSpeed * 3.6)} km/h</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintHourlyContainer;