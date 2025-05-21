const express = require('express');
const cors = require('cors');
const { getWeather } = require('./weatherService');
const { generateWeatherSummary } = require('./aiPresenter');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/weather-summary', async (req, res) => {
  try {
    const { city } = req.body;
    const weatherData = await getWeather(city);
    const summary = await generateWeatherSummary(weatherData);
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
