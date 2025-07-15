const express = require('express');
const axios = require('axios');
const router = express.Router();

// Heat Risk Calculation Function
const calculateHeatRisk = (temperature, humidity) => {
  // Calculate heat index (simplified version)
  const heatIndex = calculateHeatIndex(temperature, humidity);
  
  // Determine risk level based on temperature and heat index
  let riskLevel;
  if (heatIndex >= 40) {
    riskLevel = 'extreme';
  } else if (heatIndex >= 35) {
    riskLevel = 'high';
  } else if (heatIndex >= 30) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'low';
  }
  
  return {
    temperature,
    humidity,
    heatIndex,
    riskLevel
  };
};

// Simplified Heat Index calculation
const calculateHeatIndex = (temp, humidity) => {
  // Convert Celsius to Fahrenheit for calculation
  const tempF = (temp * 9/5) + 32;
  const rh = humidity;
  
  // Simplified heat index formula
  if (tempF < 80) {
    return temp; // Return original temperature if below 80°F
  }
  
  const hi = 0.5 * (tempF + 61.0 + ((tempF - 68.0) * 1.2) + (rh * 0.094));
  
  if (hi > 80) {
    const c1 = -42.379;
    const c2 = 2.04901523;
    const c3 = 10.14333127;
    const c4 = -0.22475541;
    const c5 = -6.83783e-3;
    const c6 = -5.481717e-2;
    const c7 = 1.22874e-3;
    const c8 = 8.5282e-4;
    const c9 = -1.99e-6;
    
    const heatIndex = c1 + (c2 * tempF) + (c3 * rh) + (c4 * tempF * rh) + 
                     (c5 * tempF * tempF) + (c6 * rh * rh) + 
                     (c7 * tempF * tempF * rh) + (c8 * tempF * rh * rh) + 
                     (c9 * tempF * tempF * rh * rh);
    
    // Convert back to Celsius
    return (heatIndex - 32) * 5/9;
  }
  
  return (hi - 32) * 5/9; // Convert back to Celsius
};

// GET /api/weather?city=CityName or /api/weather?lat=xxx&lon=xxx
router.get('/', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ 
        error: 'Please provide either city name or latitude/longitude coordinates' 
      });
    }
    
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = process.env.OPENWEATHER_BASE_URL;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Weather API key not configured' 
      });
    }
    
    let weatherUrl;
    if (city) {
      weatherUrl = `${baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      weatherUrl = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }
    
    const response = await axios.get(weatherUrl);
    const weatherData = response.data;
    
    // Extract relevant data
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const feelsLike = weatherData.main.feels_like;
    const description = weatherData.weather[0].description;
    const location = weatherData.name;
    const country = weatherData.sys.country;
    
    // Calculate heat risk
    const heatRisk = calculateHeatRisk(temperature, humidity);
    
    // Get mitigation tips based on risk level
    const mitigationTips = getMitigationTips(heatRisk.riskLevel);
    
    res.json({
      success: true,
      data: {
        location: `${location}, ${country}`,
        current: {
          temperature: Math.round(temperature),
          humidity,
          feelsLike: Math.round(feelsLike),
          description,
          heatIndex: Math.round(heatRisk.heatIndex),
          riskLevel: heatRisk.riskLevel
        },
        risk: {
          level: heatRisk.riskLevel,
          score: Math.round(heatRisk.heatIndex),
          tips: mitigationTips
        },
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Weather API Error:', error.message);
    
    if (error.response) {
      // API responded with error
      const status = error.response.status;
      let message = 'Weather data unavailable';
      
      if (status === 404) {
        message = 'City not found';
      } else if (status === 401) {
        message = 'Invalid API key';
      } else if (status === 429) {
        message = 'API rate limit exceeded';
      }
      
      return res.status(status).json({ error: message });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET /api/weather/forecast?city=CityName
router.get('/forecast', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ 
        error: 'Please provide either city name or latitude/longitude coordinates' 
      });
    }
    
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = process.env.OPENWEATHER_BASE_URL;
    
    let forecastUrl;
    if (city) {
      forecastUrl = `${baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      forecastUrl = `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }
    
    const response = await axios.get(forecastUrl);
    const forecastData = response.data;
    
    // Process forecast data
    const forecast = forecastData.list.slice(0, 5).map(item => {
      const temp = item.main.temp;
      const humidity = item.main.humidity;
      const heatRisk = calculateHeatRisk(temp, humidity);
      
      return {
        time: new Date(item.dt * 1000).toISOString(),
        temperature: Math.round(temp),
        humidity,
        heatIndex: Math.round(heatRisk.heatIndex),
        riskLevel: heatRisk.riskLevel,
        description: item.weather[0].description
      };
    });
    
    res.json({
      success: true,
      data: {
        location: `${forecastData.city.name}, ${forecastData.city.country}`,
        forecast,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Forecast API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// Function to get mitigation tips based on risk level
const getMitigationTips = (riskLevel) => {
  const tips = {
    low: [
      "Stay hydrated with water",
      "Wear light-colored clothing",
      "Take regular breaks in shade",
      "Monitor weather updates"
    ],
    moderate: [
      "Avoid prolonged outdoor activities",
      "Seek air-conditioned spaces",
      "Wear sunscreen and protective clothing",
      "Check on vulnerable neighbors",
      "Plant trees for natural cooling"
    ],
    high: [
      "Limit outdoor activities to early morning or evening",
      "Use cooling centers if available",
      "Apply wet towels to neck and wrists",
      "Install reflective window coverings",
      "Create green spaces and urban gardens"
    ],
    extreme: [
      "Avoid all non-essential outdoor activities",
      "Seek immediate air conditioning",
      "Check on elderly and vulnerable people",
      "Call emergency services if experiencing heat illness",
      "Implement emergency heat response plans",
      "Use cool water for body cooling"
    ]
  };
  
  return tips[riskLevel] || tips.low;
};

module.exports = router;