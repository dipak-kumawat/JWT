require("dotenv").config();
const axios = require("axios");
const User = require("../models/user");

// Fetch Weather Data
const getWeather = async (req, res) => {
  const { city } = req.query; // Extract city from query params

  if (!city) {
    return res.status(400).json({ error: "City is required." });
  }

  const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // WeatherStack API key
  const BASE_URL = `http://api.weatherstack.com/current`;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: WEATHER_API_KEY,
        query: city,
      },
    });

    if (response.data.error) {
      return res.status(404).json({
        error: response.data.error.info || "City not found.",
      });
    }

    // Return weather data in the expected format
    res.status(200).json({
      location: response.data.location,
      current: {
        temperature: response.data.current.temperature,
        weather_descriptions: response.data.current.weather_descriptions,
        humidity: response.data.current.humidity,
        wind_speed: response.data.current.wind_speed,
      },
    });
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
    res.status(500).json({
      error: "An error occurred while fetching weather data.",
    });
  }
};

module.exports = { getWeather };
