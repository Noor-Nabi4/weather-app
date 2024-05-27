"use client"
import { WeatherData } from '@/dataTypes';
import useLocation from '@/hooks/useLocation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const WeatherApp: React.FC = () => {
  const { position, error } = useLocation();
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null
  );

  const fetchWeather = async (location: string) => {
    const url = `/api/weather/${location?.toString()}`

    try {
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        location: {
          name: data.location.name,
          region: data.location.region,
          country: data.location.country,
          lat: data.location.lat,
          lon: data.location.lon,
          tz_id: data.location.tz_id,
          localtime_epoch: data.location.localtime_epoch,
          localtime: data.location.localtime
        },
        current: {
          last_updated_epoch: data.current.last_updated_epoch,
          last_updated: data.current.last_updated,
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          is_day: data.current.is_day,
          condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon,
            code: data.current.condition.code
          },
          wind_mph: data.current.wind_mph,
          wind_kph: data.current.wind_kph,
          wind_degree: data.current.wind_degree,
          wind_dir: data.current.wind_dir,
          pressure_mb: data.current.pressure_mb,
          pressure_in: data.current.pressure_in,
          precip_mm: data.current.precip_mm,
          precip_in: data.current.precip_in,
          humidity: data.current.humidity,
          cloud: data.current.cloud,
          feelslike_c: data.current.feelslike_c,
          feelslike_f: data.current.feelslike_f,
          vis_km: data.current.vis_km,
          vis_miles: data.current.vis_miles,
          uv: data.current.uv,
          gust_mph: data.current.gust_mph,
          gust_kph: data.current.gust_kph
        }
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (position) {
      fetchWeather(position?.latitude + ',' + position?.longitude)
    }

  }, [position]);

  const handleSearch = () => {
    if (location) {
      fetchWeather(location);
    }
  };


  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        id="locationInput"
        placeholder="Enter a city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button id="searchButton" onClick={handleSearch}>Search</button>
      {weatherData && (
        <div className="weather-info">
          <h2 id="location">{weatherData?.location.name}</h2>
          <Image src={`https:${weatherData.current.condition.icon}`} alt="Weather Icon" width={64}height={64} className='inline-block'/>
          <p id="temperature">{weatherData?.current.temp_c}°C</p>
          <div className="weather-table">
            <table>
              <tbody>
                <tr>
                  <td><strong>Region</strong></td>
                  <td>{weatherData.location.region}</td>
                </tr>
                <tr>
                  <td><strong>Country</strong></td>
                  <td>{weatherData.location.country}</td>
                </tr>
                <tr>
                  <td><strong>Latitude</strong></td>
                  <td>{weatherData.location.lat}</td>
                </tr>
                <tr>
                  <td><strong>Longitude</strong></td>
                  <td>{weatherData.location.lon}</td>
                </tr>
                <tr>
                  <td><strong>Local Time</strong></td>
                  <td>{weatherData.location.localtime}</td>
                </tr>
                <tr>
                  <td><strong>Temperature (F)</strong></td>
                  <td>{weatherData.current.temp_f}°F</td>
                </tr>
                <tr>
                  <td><strong>Condition</strong></td>
                  <td>{weatherData.current.condition.text}</td>
                </tr>
                <tr>
                  <td><strong>Feels Like (C)</strong></td>
                  <td>{weatherData.current.feelslike_c}°C</td>
                </tr>
                <tr>
                  <td><strong>Feels Like (F)</strong></td>
                  <td>{weatherData.current.feelslike_f}°F</td>
                </tr>
                <tr>
                  <td><strong>Wind (KPH)</strong></td>
                  <td>{weatherData.current.wind_kph} kph</td>
                </tr>
                <tr>
                  <td><strong>Wind (MPH)</strong></td>
                  <td>{weatherData.current.wind_mph} mph</td>
                </tr>
                <tr>
                  <td><strong>Humidity</strong></td>
                  <td>{weatherData.current.humidity}%</td>
                </tr>
                <tr>
                  <td><strong>Pressure (MB)</strong></td>
                  <td>{weatherData.current.pressure_mb} mb</td>
                </tr>
                <tr>
                  <td><strong>Pressure (Inches)</strong></td>
                  <td>{weatherData.current.pressure_in} in</td>
                </tr>
                <tr>
                  <td><strong>UV Index</strong></td>
                  <td>{weatherData.current.uv}</td>
                </tr>
                <tr>
                  <td><strong>Gust (KPH)</strong></td>
                  <td>{weatherData.current.gust_kph} kph</td>
                </tr>
                <tr>
                  <td><strong>Gust (MPH)</strong></td>
                  <td>{weatherData.current.gust_mph} mph</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div >
  );
};

export default WeatherApp;