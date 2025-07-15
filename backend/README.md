# HeatAware Backend

A Node.js/Express backend API for the HeatAware urban heat risk visualization platform.

## Features

- **Weather Data Integration**: Real-time weather data from OpenWeatherMap API
- **Heat Risk Calculation**: Automated heat index calculation and risk level assessment
- **Mitigation Strategies**: Comprehensive heat mitigation recommendations
- **Contact Management**: Form submission handling with JSON file storage
- **CORS Support**: Configured for frontend development
- **Error Handling**: Robust error handling and logging

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # OpenWeatherMap API (Get free key at https://openweathermap.org/api)
   OPENWEATHER_API_KEY=your_actual_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5

   # Database
   DB_PATH=./data/heataware.db

   # Security
   JWT_SECRET=your_jwt_secret_here
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`.

## API Endpoints

### Weather Endpoints

#### Get Current Weather
```
GET /api/weather?city=New York
GET /api/weather?lat=40.7128&lon=-74.0060
```

Response:
```json
{
  "success": true,
  "data": {
    "location": "New York, US",
    "current": {
      "temperature": 32,
      "humidity": 65,
      "feelsLike": 35,
      "description": "clear sky",
      "heatIndex": 34,
      "riskLevel": "moderate"
    },
    "risk": {
      "level": "moderate",
      "score": 34,
      "tips": [
        "Avoid prolonged outdoor activities",
        "Seek air-conditioned spaces",
        "Wear sunscreen and protective clothing"
      ]
    },
    "timestamp": "2024-01-10T12:00:00Z"
  }
}
```

#### Get Weather Forecast
```
GET /api/weather/forecast?city=New York
GET /api/weather/forecast?lat=40.7128&lon=-74.0060
```

### Mitigation Endpoints

#### Get Mitigation Strategies
```
GET /api/mitigation/strategies
GET /api/mitigation/strategies?level=extreme
```

#### Get Mitigation Tips
```
GET /api/mitigation/tips
GET /api/mitigation/tips?category=personal
```

#### Get Resources
```
GET /api/mitigation/resources
```

### Contact Endpoints

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about heat data",
  "message": "I need help understanding the heat index calculation.",
  "priority": "normal"
}
```

#### Submit Feedback
```
POST /api/contact/feedback
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "rating": 5,
  "category": "feature-request",
  "feedback": "Great tool! Would love to see more detailed forecasts.",
  "anonymous": false
}
```

### Health Check
```
GET /api/health
```

## Heat Risk Calculation

The system calculates heat risk based on:

1. **Temperature**: Base temperature in Celsius
2. **Humidity**: Relative humidity percentage
3. **Heat Index**: Calculated using the National Weather Service formula
4. **Risk Levels**:
   - **Low**: Heat index < 30°C
   - **Moderate**: Heat index 30-35°C
   - **High**: Heat index 35-40°C
   - **Extreme**: Heat index > 40°C

## Data Storage

- **Contact Forms**: Stored in `data/contacts.json`
- **Feedback**: Stored in `data/feedback.json`
- **Format**: JSON with timestamps and unique IDs

## Error Handling

The API includes comprehensive error handling:

- **400**: Bad Request (invalid parameters)
- **401**: Unauthorized (invalid API key)
- **404**: Not Found (city not found)
- **429**: Rate limit exceeded
- **500**: Internal Server Error

## Development

### Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with auto-reload
- `npm test`: Run tests (to be implemented)

### Project Structure

```
backend/
├── data/           # JSON data storage
├── routes/         # API route handlers
│   ├── weather.js  # Weather API endpoints
│   ├── mitigation.js # Mitigation strategies
│   └── contact.js  # Contact form handling
├── server.js       # Main server file
├── package.json    # Dependencies
└── .env           # Environment variables
```

### Adding New Features

1. **New Routes**: Add route files in `routes/` directory
2. **Import Routes**: Add to `server.js`
3. **Test Endpoints**: Use tools like Postman or curl

## Production Deployment

1. **Set Environment Variables**:
   ```bash
   NODE_ENV=production
   PORT=5000
   OPENWEATHER_API_KEY=your_production_key
   ```

2. **Start Server**:
   ```bash
   npm start
   ```

3. **Process Manager** (recommended):
   ```bash
   npm install -g pm2
   pm2 start server.js --name heataware-backend
   ```

## Troubleshooting

### Common Issues

1. **API Key Issues**:
   - Ensure your OpenWeatherMap API key is valid
   - Check if the key is properly set in `.env`
   - Verify API key has necessary permissions

2. **CORS Issues**:
   - Update `FRONTEND_URL` in `.env`
   - Ensure frontend is running on the correct port

3. **Port Conflicts**:
   - Change `PORT` in `.env` if 5000 is occupied
   - Update frontend API configuration accordingly

### Logging

The server logs important events:
- API requests and responses
- Error details
- Weather API calls
- Form submissions

## Security Considerations

- API keys are stored in environment variables
- Form validation prevents malicious input
- CORS configured for specific origins
- Helmet.js for security headers

## License

This project is licensed under the MIT License.