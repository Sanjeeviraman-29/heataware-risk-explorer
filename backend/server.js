import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import axios from 'axios';

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Weather API configuration
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Heat risk calculation function
const calculateHeatRisk = (temperature, humidity, heatIndex) => {
  if (temperature > 40 || heatIndex > 45) {
    return { level: 'extreme', color: '#dc2626', priority: 4 };
  } else if (temperature > 35 || heatIndex > 40) {
    return { level: 'high', color: '#ea580c', priority: 3 };
  } else if (temperature > 30 || heatIndex > 35) {
    return { level: 'moderate', color: '#ca8a04', priority: 2 };
  } else {
    return { level: 'low', color: '#16a34a', priority: 1 };
  }
};

// Calculate heat index (simplified formula)
const calculateHeatIndex = (temp, humidity) => {
  if (temp < 27) return temp;
  
  const T = temp;
  const H = humidity;
  
  let HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (H * 0.094));
  
  if (HI >= 80) {
    HI = -42.379 + 2.04901523 * T + 10.14333127 * H - 0.22475541 * T * H
      - 0.00683783 * T * T - 0.05481717 * H * H + 0.00122874 * T * T * H
      + 0.00085282 * T * H * H - 0.00000199 * T * T * H * H;
  }
  
  return Math.round(HI);
};

// Get mitigation recommendations based on risk level
const getMitigationRecommendations = (riskLevel, temperature) => {
  const recommendations = {
    extreme: [
      "Avoid outdoor activities during peak hours (10 AM - 4 PM)",
      "Stay in air-conditioned spaces when possible",
      "Wear light-colored, loose-fitting clothing",
      "Drink water frequently, even if not thirsty",
      "Check on elderly neighbors and vulnerable populations",
      "Consider cooling centers if home cooling is inadequate",
      "Limit sun exposure and seek shade",
      "Use fans to circulate air indoors"
    ],
    high: [
      "Limit outdoor exercise to early morning or evening",
      "Wear sunscreen and protective clothing",
      "Stay hydrated with water and electrolyte drinks",
      "Take frequent breaks in shade or air conditioning",
      "Plant trees and create green spaces for cooling",
      "Use light-colored building materials",
      "Install green roofs or cool roof materials",
      "Create community cooling centers"
    ],
    moderate: [
      "Exercise during cooler parts of the day",
      "Wear appropriate sun protection",
      "Stay hydrated during outdoor activities",
      "Use natural ventilation when possible",
      "Plant shade trees around buildings",
      "Use reflective window films",
      "Install awnings or shade structures",
      "Promote urban green infrastructure"
    ],
    low: [
      "Maintain normal outdoor activities",
      "Continue regular hydration habits",
      "Use this time for heat preparedness planning",
      "Consider long-term cooling strategies",
      "Plant heat-resistant vegetation",
      "Install efficient cooling systems",
      "Improve building insulation",
      "Develop community heat response plans"
    ]
  };
  
  return recommendations[riskLevel] || recommendations.low;
};

// Generate dummy historical data
const generateHistoricalData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseTemp = 32 + Math.sin(i * 0.2) * 8 + Math.random() * 6;
    const minTemp = baseTemp - 5 - Math.random() * 3;
    const maxTemp = baseTemp + 5 + Math.random() * 3;
    
    data.push({
      date: date.toISOString().split('T')[0],
      temperature: Math.round(baseTemp * 10) / 10,
      minTemp: Math.round(minTemp * 10) / 10,
      maxTemp: Math.round(maxTemp * 10) / 10,
      humidity: Math.round(50 + Math.random() * 30),
      heatIndex: calculateHeatIndex(baseTemp, 50 + Math.random() * 30)
    });
  }
  
  return data;
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get weather data and heat risk
app.get('/api/weather', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ 
        error: 'Please provide either city name or latitude/longitude coordinates' 
      });
    }

    let weatherUrl;
    if (city) {
      weatherUrl = `${WEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
    } else {
      weatherUrl = `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    }

    // For demo purposes, if no real API key is provided, return mock data
    if (WEATHER_API_KEY === 'demo_key') {
      const mockData = {
        location: city || `${lat}, ${lon}`,
        temperature: 35.5,
        humidity: 65,
        feelsLike: 42.3,
        description: 'Hot',
        pressure: 1013,
        windSpeed: 15.5,
        visibility: 10000,
        uvIndex: 8,
        timestamp: new Date().toISOString()
      };
      
      const heatIndex = calculateHeatIndex(mockData.temperature, mockData.humidity);
      const risk = calculateHeatRisk(mockData.temperature, mockData.humidity, heatIndex);
      const recommendations = getMitigationRecommendations(risk.level, mockData.temperature);
      
      return res.json({
        weather: mockData,
        heatRisk: {
          level: risk.level,
          color: risk.color,
          priority: risk.priority,
          heatIndex: heatIndex,
          recommendations: recommendations
        },
        historical: generateHistoricalData(),
        areas: [
          { name: "Downtown Core", risk: "extreme", population: 45000, temp: 38.2 },
          { name: "Industrial District", risk: "high", population: 32000, temp: 36.5 },
          { name: "Residential North", risk: "moderate", population: 48000, temp: 33.8 },
          { name: "Suburban East", risk: "low", population: 28000, temp: 31.2 }
        ]
      });
    }

    const response = await axios.get(weatherUrl);
    const data = response.data;
    
    const weatherData = {
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      visibility: data.visibility,
      timestamp: new Date().toISOString()
    };
    
    const heatIndex = calculateHeatIndex(weatherData.temperature, weatherData.humidity);
    const risk = calculateHeatRisk(weatherData.temperature, weatherData.humidity, heatIndex);
    const recommendations = getMitigationRecommendations(risk.level, weatherData.temperature);
    
    res.json({
      weather: weatherData,
      heatRisk: {
        level: risk.level,
        color: risk.color,
        priority: risk.priority,
        heatIndex: heatIndex,
        recommendations: recommendations
      },
      historical: generateHistoricalData(),
      areas: [
        { name: "Downtown Core", risk: "extreme", population: 45000, temp: weatherData.temperature + 3 },
        { name: "Industrial District", risk: "high", population: 32000, temp: weatherData.temperature + 1 },
        { name: "Residential North", risk: "moderate", population: 48000, temp: weatherData.temperature - 1 },
        { name: "Suburban East", risk: "low", population: 28000, temp: weatherData.temperature - 3 }
      ]
    });
    
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      details: error.response?.data?.message || error.message 
    });
  }
});

// Get dashboard analytics
app.get('/api/dashboard', async (req, res) => {
  try {
    const { dateRange = '30d', location = 'metro-area' } = req.query;
    
    const days = parseInt(dateRange.replace('d', '')) || 30;
    const historical = generateHistoricalData(days);
    
    const avgTemp = historical.reduce((sum, day) => sum + day.temperature, 0) / historical.length;
    const extremeDays = historical.filter(day => day.temperature > 35).length;
    const affectedPop = Math.round(125000 + Math.random() * 50000);
    
    res.json({
      summary: {
        avgTemperature: Math.round(avgTemp * 10) / 10,
        extremeAreas: Math.min(extremeDays, 20),
        affectedPopulation: affectedPop,
        riskTrend: extremeDays > days * 0.3 ? 'increasing' : 'stable'
      },
      historical: historical,
      zones: [
        { name: "Downtown Core", risk: "extreme", population: 45000, area: "12 km²", temp: 38.2 },
        { name: "Industrial West", risk: "high", population: 32000, area: "18 km²", temp: 36.5 },
        { name: "Residential North", risk: "moderate", population: 48000, area: "25 km²", temp: 33.8 },
        { name: "Suburban East", risk: "low", population: 28000, area: "35 km²", temp: 31.2 }
      ],
      riskDistribution: {
        extreme: 15,
        high: 25,
        moderate: 35,
        low: 25
      }
    });
    
  } catch (error) {
    console.error('Dashboard error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard data',
      details: error.message 
    });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, organization, message, type = 'general' } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    const submission = {
      id: Date.now(),
      name,
      email,
      organization: organization || '',
      message,
      type,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Save to JSON file
    const dataPath = join(__dirname, 'data', 'contacts.json');
    
    try {
      await fs.mkdir(join(__dirname, 'data'), { recursive: true });
      
      let contacts = [];
      try {
        const existingData = await fs.readFile(dataPath, 'utf8');
        contacts = JSON.parse(existingData);
      } catch (err) {
        // File doesn't exist, start with empty array
      }
      
      contacts.push(submission);
      await fs.writeFile(dataPath, JSON.stringify(contacts, null, 2));
      
      res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        id: submission.id
      });
      
    } catch (fileError) {
      console.error('File operation error:', fileError);
      res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        id: submission.id
      });
    }
    
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: error.message 
    });
  }
});

// Get mitigation recommendations
app.get('/api/mitigation', async (req, res) => {
  try {
    const { riskLevel = 'moderate', category = 'all' } = req.query;
    
    const allStrategies = {
      immediate: [
        {
          title: "Seek Air Conditioning",
          description: "Move to air-conditioned spaces during peak heat hours",
          riskLevel: ["high", "extreme"],
          priority: "urgent"
        },
        {
          title: "Hydrate Frequently",
          description: "Drink water every 15-20 minutes, even if not thirsty",
          riskLevel: ["moderate", "high", "extreme"],
          priority: "high"
        },
        {
          title: "Wear Light Clothing",
          description: "Choose light-colored, loose-fitting, breathable fabrics",
          riskLevel: ["moderate", "high", "extreme"],
          priority: "medium"
        },
        {
          title: "Limit Sun Exposure",
          description: "Stay in shade or indoors during 10 AM - 4 PM",
          riskLevel: ["high", "extreme"],
          priority: "urgent"
        }
      ],
      shortTerm: [
        {
          title: "Install Cooling Systems",
          description: "Set up fans, AC units, or swamp coolers for immediate relief",
          riskLevel: ["moderate", "high", "extreme"],
          priority: "high"
        },
        {
          title: "Create Shade Structures",
          description: "Install awnings, umbrellas, or temporary shade sails",
          riskLevel: ["moderate", "high"],
          priority: "medium"
        },
        {
          title: "Improve Ventilation",
          description: "Open windows at night, use cross-ventilation techniques",
          riskLevel: ["low", "moderate"],
          priority: "medium"
        },
        {
          title: "Cool Roof Treatments",
          description: "Apply reflective paint or install cool roofing materials",
          riskLevel: ["moderate", "high", "extreme"],
          priority: "high"
        }
      ],
      longTerm: [
        {
          title: "Plant Trees",
          description: "Establish urban canopy with heat-tolerant tree species",
          riskLevel: ["low", "moderate", "high"],
          priority: "high"
        },
        {
          title: "Green Infrastructure",
          description: "Implement green roofs, walls, and permeable surfaces",
          riskLevel: ["moderate", "high"],
          priority: "medium"
        },
        {
          title: "Building Insulation",
          description: "Improve building envelope to reduce heat gain",
          riskLevel: ["moderate", "high", "extreme"],
          priority: "high"
        },
        {
          title: "Community Cooling Centers",
          description: "Establish public spaces with AC for vulnerable populations",
          riskLevel: ["high", "extreme"],
          priority: "urgent"
        }
      ]
    };
    
    let strategies = allStrategies;
    if (category !== 'all') {
      strategies = { [category]: allStrategies[category] };
    }
    
    // Filter by risk level
    const filteredStrategies = {};
    for (const [key, value] of Object.entries(strategies)) {
      filteredStrategies[key] = value.filter(strategy => 
        strategy.riskLevel.includes(riskLevel)
      );
    }
    
    res.json({
      riskLevel,
      category,
      strategies: filteredStrategies,
      summary: {
        totalStrategies: Object.values(filteredStrategies).flat().length,
        urgentActions: Object.values(filteredStrategies).flat().filter(s => s.priority === 'urgent').length,
        recommendations: getMitigationRecommendations(riskLevel, 35)
      }
    });
    
  } catch (error) {
    console.error('Mitigation error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch mitigation strategies',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌡️  HeatAware Backend running on port ${PORT}`);
  console.log(`🚀 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`📊 Weather API: ${WEATHER_API_KEY === 'demo_key' ? 'Demo mode' : 'Live mode'}`);
});