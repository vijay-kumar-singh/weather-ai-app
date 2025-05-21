const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateWeatherSummary(weatherData) {
  const prompt = `
You are a friendly weather assistant. Based on the following data, generate a 2-sentence summary for a user:

Weather data:
City: ${weatherData.city}
Temperature: ${weatherData.temperature}°C
Condition: ${weatherData.condition}

Respond in natural language.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

module.exports = { generateWeatherSummary };
