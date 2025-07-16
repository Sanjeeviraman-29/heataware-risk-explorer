#!/bin/bash

echo "🌡️  Setting up HeatAware - Urban Heat Risk Platform"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Check if nodemon is installed globally, if not install it
if ! command -v nodemon &> /dev/null; then
    echo "📦 Installing nodemon globally..."
    npm install -g nodemon
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Create environment files if they don't exist
if [ ! -f ".env" ]; then
    echo "📄 Creating frontend .env file..."
    cp .env.example .env
    echo "✅ Frontend .env file created"
fi

if [ ! -f "backend/.env" ]; then
    echo "📄 Backend .env file already exists"
else
    echo "✅ Backend .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  • Backend: ./start-backend.sh"
echo "  • Frontend: ./start-frontend.sh"
echo "  • Both: ./start-all.sh"
echo ""
echo "The application will be available at:"
echo "  • Frontend: http://localhost:5173"
echo "  • Backend API: http://localhost:3001"
echo ""
echo "Note: The backend is running in demo mode. To use real weather data,"
echo "get an API key from OpenWeatherMap and update backend/.env"