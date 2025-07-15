# HeatAware - Urban Heat Risk Visualization Platform

A comprehensive web application for visualizing urban heatwave risks and providing mitigation recommendations. Built with React/TypeScript frontend and Node.js/Express backend.

## 🌟 Features

- **Real-time Weather Data**: Integration with OpenWeatherMap API
- **Heat Risk Assessment**: Automated heat index calculation and risk level classification
- **Interactive Visualizations**: Color-coded heat risk maps and trend charts
- **Mitigation Strategies**: Comprehensive recommendations for heat safety
- **Location Support**: Search by city name or use geolocation
- **Contact Forms**: Backend form handling with data persistence
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. **Get OpenWeatherMap API Key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key from the dashboard

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your API key
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   # In project root
   npm install
   npm run dev
   ```

4. **Test the Application**:
   - Open http://localhost:5173
   - Navigate to "Risk Visualization"
   - Search for a city (e.g., "New York")
   - View real-time heat risk data

## 🎨 Heat Risk Levels

| Risk Level | Heat Index | Color | Actions |
|------------|------------|-------|---------|
| **Low** | < 30°C | 🟢 Green | Normal activities |
| **Moderate** | 30-35°C | 🟡 Yellow | Caution advised |
| **High** | 35-40°C | 🟠 Orange | Limit outdoor activities |
| **Extreme** | > 40°C | 🔴 Red | Emergency protocols |

## 🛠️ Technology Stack

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- shadcn/ui components
- Tailwind CSS for styling
- React Query for API state management

### Backend
- Node.js + Express
- OpenWeatherMap API integration
- JSON file storage for contacts
- CORS enabled for development
- Comprehensive error handling

## 📁 Project Structure

```
heataware/
├── backend/              # Node.js backend
│   ├── routes/          # API endpoints
│   ├── data/            # JSON storage
│   └── server.js        # Main server
├── src/                 # React frontend
│   ├── pages/          # Page components
│   ├── components/     # UI components
│   ├── services/       # API layer
│   └── hooks/          # Custom hooks
└── README.md           # This file
```

## 🌐 API Endpoints

### Weather Data
- `GET /api/weather?city=CityName` - Current weather
- `GET /api/weather/forecast?city=CityName` - 5-day forecast

### Mitigation
- `GET /api/mitigation/strategies` - Heat safety strategies
- `GET /api/mitigation/resources` - Emergency resources

### Contact
- `POST /api/contact` - Submit contact form
- `POST /api/contact/feedback` - Submit feedback

## 📄 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed installation instructions
- [Backend API](./backend/README.md) - API documentation

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

## 📜 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the [Setup Guide](./SETUP_GUIDE.md) for common issues
- Open an issue on GitHub for bugs or feature requests
- Contact us through the application's contact form

---

**Made with ❤️ for urban heat safety**
