# HeatAware - Urban Heat Risk Platform

A comprehensive web application for visualizing urban heatwave risks and providing mitigation recommendations. Built with React TypeScript frontend and Node.js/Express backend.

## Features

### 🌡️ **Weather Data Integration**
- Real-time weather data via OpenWeatherMap API
- Heat index calculations
- Temperature, humidity, and heat risk assessment
- Demo mode available without API key

### 📊 **Risk Visualization**
- Interactive heat risk maps
- Risk level calculations (Low, Moderate, High, Extreme)
- Area-based risk analysis
- Real-time temperature monitoring

### 📈 **Analytics Dashboard**
- Historical temperature trends
- Population exposure analysis
- Risk distribution charts
- Zone-based analytics
- Exportable reports

### 🛡️ **Mitigation Strategies**
- Dynamic recommendations based on risk levels
- Immediate, short-term, and long-term strategies
- Evidence-based cooling solutions
- Community protection guidelines

### 📞 **Contact & Support**
- Contact form with backend integration
- Resource library
- Team information
- Community resources

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **React Query** for data fetching
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **OpenWeatherMap API** integration
- **JSON file storage** for contacts
- **CORS** enabled for development
- **Rate limiting** and security features

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
2. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the application:**
   ```bash
   # Option 1: Start both frontend and backend
   chmod +x start-all.sh
   ./start-all.sh
   
   # Option 2: Start separately
   chmod +x start-backend.sh start-frontend.sh
   ./start-backend.sh  # Terminal 1
   ./start-frontend.sh # Terminal 2
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Configuration

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_ENV=development
```

**Backend (backend/.env):**
```env
PORT=3001
OPENWEATHER_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```

### Getting Weather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Get your API key
4. Update `backend/.env` with your key
5. Restart the backend server

**Note:** The application works in demo mode without an API key.

## API Endpoints

### Weather Data
- `GET /api/weather?city=Chennai` - Get weather and heat risk data
- `GET /api/weather?lat=13.0827&lon=80.2707` - Get data by coordinates

### Dashboard
- `GET /api/dashboard?dateRange=30d&location=metro-area` - Get analytics data

### Mitigation
- `GET /api/mitigation?riskLevel=high&category=immediate` - Get strategies

### Contact
- `POST /api/contact` - Submit contact form

### Health Check
- `GET /api/health` - Check server status

## Features in Detail

### Heat Risk Calculation
The system calculates heat risk based on:
- **Temperature thresholds:**
  - Low: < 30°C
  - Moderate: 30-35°C
  - High: 35-40°C
  - Extreme: > 40°C
- **Heat index calculations**
- **Humidity considerations**

### Data Sources
- **Weather Data:** OpenWeatherMap API
- **Historical Data:** Generated algorithmically for demonstration
- **Population Data:** Simulated based on typical urban demographics
- **Risk Areas:** Calculated based on temperature and population density

### Security Features
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation
- Error handling
- Secure headers with Helmet.js

## Development

### Project Structure
```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   └── ...
├── backend/               # Backend source code
│   ├── server.js          # Express server
│   ├── data/              # JSON data storage
│   └── ...
├── public/                # Static assets
└── scripts/               # Setup and run scripts
```

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### Adding New Features

1. **Backend API:** Add routes in `backend/server.js`
2. **Frontend Services:** Add API calls in `src/services/api.ts`
3. **React Hooks:** Create custom hooks in `src/hooks/`
4. **Components:** Add reusable components in `src/components/`

## Deployment

### Frontend (Vite)
```bash
npm run build
# Deploy `dist` folder to your hosting service
```

### Backend (Node.js)
```bash
# Set environment variables
export NODE_ENV=production
export PORT=3001
export OPENWEATHER_API_KEY=your_key

# Start server
npm start
```

### Recommended Hosting
- **Frontend:** Vercel, Netlify, or any static hosting
- **Backend:** Heroku, Railway, or any Node.js hosting
- **Database:** Consider upgrading to PostgreSQL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For questions or support:
- Check the contact form in the application
- Review the API documentation
- Check the backend logs for debugging

## Future Enhancements

- [ ] Real-time weather alerts
- [ ] User accounts and saved locations
- [ ] Integration with city planning databases
- [ ] Mobile app version
- [ ] Advanced mapping with Google Maps/Mapbox
- [ ] Machine learning for risk prediction
- [ ] Multi-language support
- [ ] Offline mode capabilities

---

Built with ❤️ for climate resilience and urban heat mitigation.
