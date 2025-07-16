#!/bin/bash

echo "🚀 Starting HeatAware Backend Server..."
echo "======================================"

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found. Please run ./setup.sh first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "backend/node_modules" ]; then
    echo "❌ Backend dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

# Start the backend server
cd backend
echo "🌡️  Starting backend server on port 3001..."
echo "📊 Running in demo mode (no real weather API key required)"
echo "🔄 Use Ctrl+C to stop the server"
echo ""

npm run dev