# HeatAware Backend API

A Node.js/Express backend for the HeatAware urban heatwave risk visualization platform.

## Features

- **Weather Data Integration**: OpenWeatherMap API integration for real-time weather data
- **Heat Risk Calculation**: Automatic calculation of heat risk levels based on temperature and humidity
- **Mitigation Recommendations**: Dynamic recommendations based on risk levels
- **Historical Data**: Generated historical temperature trends for analytics
- **Contact Form**: Form submission handling with JSON file storage
- **Rate Limiting**: API rate limiting for security
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (optional - demo mode available)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3001
OPENWEATHER_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Weather & Heat Risk

**GET** `/api/weather`
- Query parameters: `city` (string) OR `lat` & `lon` (numbers)
- Returns: Current weather, heat risk level, and mitigation recommendations

Example:
```bash
curl "http://localhost:3001/api/weather?city=Chennai"
```

Response:
```json
{
  "weather": {
    "location": "Chennai",
    "temperature": 35.5,
    "humidity": 65,
    "feelsLike": 42.3,
    "description": "Hot"
  },
  "heatRisk": {
    "level": "high",
    "color": "#ea580c",
    "priority": 3,
    "heatIndex": 43,
    "recommendations": ["Limit outdoor exercise...", "Stay hydrated..."]
  },
  "historical": [...],
  "areas": [...]
}
```

### Dashboard Analytics

**GET** `/api/dashboard`
- Query parameters: `dateRange` (7d, 30d, 90d, 1y), `location` (string)
- Returns: Summary statistics, historical data, and zone analysis

### Mitigation Strategies

**GET** `/api/mitigation`
- Query parameters: `riskLevel` (low, moderate, high, extreme), `category` (immediate, shortTerm, longTerm, all)
- Returns: Filtered mitigation strategies and recommendations

### Contact Form

**POST** `/api/contact`
- Body: `{ name, email, organization?, message, type? }`
- Returns: Success confirmation and submission ID

### Health Check

**GET** `/api/health`
- Returns: Server status and timestamp

## Heat Risk Levels

The system calculates heat risk based on temperature and heat index:

- **Low**: < 30°C
- **Moderate**: 30-35°C  
- **High**: 35-40°C
- **Extreme**: > 40°C

## Data Storage

- Contact form submissions are stored in `data/contacts.json`
- Historical weather data is generated algorithmically
- No database required for basic functionality

## Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet.js security headers
- Input validation
- Error handling

## Development Notes

- Uses ES modules (`type: "module"` in package.json)
- Includes demo mode when no API key is provided
- Automatic JSON file creation for data storage
- Comprehensive error handling and logging

## API Key Setup

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Get your API key
4. Add it to your `.env` file as `OPENWEATHER_API_KEY`

Without an API key, the system runs in demo mode with mock data.

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Configure your production `FRONTEND_URL`
3. Use a process manager like PM2
4. Set up proper logging and monitoring
5. Consider using a real database for data persistence

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details