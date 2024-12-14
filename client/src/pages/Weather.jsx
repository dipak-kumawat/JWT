import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/weather", {
        params: {
          city,
        },
      });

      if (response.status === 200) {
        setWeather(response.data);
        setError("");
      }
    } catch (error) {
      setError("Error fetching weather data");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-500">
      <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">Weather Checker</h1>
        <input
          type="text"
          placeholder="Enter city name"
          className="border border-blue-500 focus:outline-none focus:border-purple-400 rounded-lg px-4 py-2 mb-4 w-64"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={fetchWeather} text="Check Weather" />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Weather Information */}
        {weather && (
          <div className="mt-6 border rounded-lg p-4 shadow-lg w-64">
            <h2 className="text-lg font-semibold">{weather.location.name}</h2>
            <p className="text-sm">
              Temperature: {weather.current.temperature}°C
            </p>
            <p className="text-sm">Humidity: {weather.current.humidity}%</p>
            <p className="text-sm">
              Weather: {weather.current.weather_descriptions[0]}
            </p>
            <p className="text-sm">
              Wind Speed: {weather.current.wind_speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>  
  );
};

export default Weather;
