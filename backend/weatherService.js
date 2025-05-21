const axios = require('axios');

async function getWeather(city) {
  // Replace with actual API if needed
  return {
    temperature: 14,
    condition: "Cloudy",
    city: city
  };
}

module.exports = { getWeather };
