# HeatAware Setup Guide

This guide will help you set up and run the complete HeatAware application with both frontend and backend components.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **OpenWeatherMap API Key** (free) - [Get here](https://openweathermap.org/api)

### 1. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After verification, go to "API Keys" in your account
4. Copy your API key (it may take a few minutes to activate)

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

**Important**: Edit the `.env` file and add your OpenWeatherMap API key:
```env
# Replace 'your_api_key_here' with your actual API key
OPENWEATHER_API_KEY=your_actual_api_key_here
```

```bash
# Start backend server
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal window:

```bash
# Navigate to project root (where package.json is)
cd ..

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Test the Application

1. Open your browser and go to `http://localhost:5173`
2. Navigate to "Risk Visualization" page
3. Enter a city name (e.g., "New York") and click "Search"
4. You should see real weather data and heat risk information

## 📁 Project Structure

```
heataware/
├── backend/              # Node.js/Express backend
│   ├── routes/          # API route handlers
│   ├── data/            # JSON data storage
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env            # Environment variables
├── src/                 # React frontend source
│   ├── pages/          # Page components
│   ├── components/     # Reusable components
│   ├── services/       # API service layer
│   └── ...
├── package.json        # Frontend dependencies
└── SETUP_GUIDE.md     # This file
```

## 🛠️ Detailed Setup Instructions

### Backend Setup

1. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**:
   Create `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # OpenWeatherMap API
   OPENWEATHER_API_KEY=your_actual_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5

   # Database
   DB_PATH=./data/heataware.db

   # Security
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Start Backend Server**:
   ```bash
   npm run dev  # Development mode with auto-reload
   # OR
   npm start    # Production mode
   ```

### Frontend Setup

1. **Install Frontend Dependencies**:
   ```bash
   # From project root
   npm install
   ```

2. **Start Frontend Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production** (optional):
   ```bash
   npm run build
   ```

## 🌐 API Endpoints

The backend provides the following endpoints:

### Weather Data
- `GET /api/weather?city=CityName` - Get current weather
- `GET /api/weather?lat=X&lon=Y` - Get weather by coordinates
- `GET /api/weather/forecast?city=CityName` - Get 5-day forecast

### Mitigation Strategies
- `GET /api/mitigation/strategies` - Get all mitigation strategies
- `GET /api/mitigation/strategies?level=extreme` - Get strategies by risk level
- `GET /api/mitigation/tips` - Get mitigation tips
- `GET /api/mitigation/resources` - Get heat safety resources

### Contact Forms
- `POST /api/contact` - Submit contact form
- `POST /api/contact/feedback` - Submit feedback

### Health Check
- `GET /api/health` - Server health status

## 🔧 Features

### Implemented Features

✅ **Real-time Weather Data**: OpenWeatherMap API integration  
✅ **Heat Risk Calculation**: Automated heat index and risk level assessment  
✅ **Interactive UI**: Search cities, view weather data, risk levels  
✅ **Mitigation Strategies**: Comprehensive heat safety recommendations  
✅ **Contact Forms**: Backend form handling with JSON storage  
✅ **Responsive Design**: Works on desktop and mobile devices  
✅ **Error Handling**: Robust error handling and user feedback  
✅ **Loading States**: Professional loading indicators  
✅ **Location Support**: Geolocation API integration  

### Dashboard Features

- **Current Weather Display**: Temperature, humidity, heat index
- **Risk Level Indicators**: Color-coded risk levels (Low, Moderate, High, Extreme)
- **Location Search**: Search by city name or use current location
- **Real-time Updates**: Live weather data from OpenWeatherMap
- **Mitigation Tips**: Context-aware safety recommendations

## 🎨 Heat Risk Levels

The system calculates heat risk based on heat index:

| Risk Level | Heat Index | Color | Description |
|------------|------------|-------|-------------|
| **Low** | < 30°C | 🟢 Green | Comfortable conditions |
| **Moderate** | 30-35°C | 🟡 Yellow | Caution advised |
| **High** | 35-40°C | 🟠 Orange | Danger - avoid outdoor activities |
| **Extreme** | > 40°C | 🔴 Red | Emergency - seek immediate cooling |

## 📱 Using the Application

### Risk Visualization Page

1. **Search for a City**:
   - Enter city name (e.g., "New York", "London", "Tokyo")
   - Click "Search" or press Enter
   - The app will display current weather and risk level

2. **View Weather Data**:
   - Current temperature and "feels like" temperature
   - Humidity percentage
   - Heat index calculation
   - Risk level with color coding

3. **Get Mitigation Tips**:
   - Personalized recommendations based on current risk level
   - Safety advice for different risk levels
   - Emergency contact information

### Contact Page

1. **Submit Inquiries**:
   - Fill out the contact form
   - Messages are stored in the backend
   - Receive confirmation upon submission

2. **Access Resources**:
   - Links to government resources
   - Academic research references
   - Community organizations

## 🔍 Troubleshooting

### Common Issues

1. **"City not found" Error**:
   - Check spelling of city name
   - Try different variations (e.g., "New York City" vs "New York")
   - Use larger cities for better results

2. **API Key Issues**:
   - Ensure your OpenWeatherMap API key is correct
   - Wait a few minutes after creating the key for activation
   - Check if you've exceeded the free tier limits

3. **CORS Errors**:
   - Make sure backend is running on port 5000
   - Check that frontend is running on port 5173
   - Verify the FRONTEND_URL in backend .env file

4. **Backend Not Starting**:
   - Check if port 5000 is available
   - Ensure all dependencies are installed
   - Verify the .env file is correctly formatted

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Check the backend terminal for server errors
3. Verify your API key is working at [OpenWeatherMap](https://openweathermap.org/api)
4. Ensure all dependencies are installed with `npm install`

## 🚀 Production Deployment

### Backend Deployment

1. **Set Environment Variables**:
   ```bash
   export NODE_ENV=production
   export PORT=5000
   export OPENWEATHER_API_KEY=your_production_key
   ```

2. **Start with Process Manager**:
   ```bash
   npm install -g pm2
   pm2 start server.js --name heataware-backend
   ```

### Frontend Deployment

1. **Build for Production**:
   ```bash
   npm run build
   ```

2. **Serve Static Files**:
   ```bash
   npm install -g serve
   serve -s dist
   ```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

---

**Need help?** Check the troubleshooting section above or open an issue on GitHub.