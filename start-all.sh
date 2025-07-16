#!/bin/bash

echo "🚀 Starting HeatAware - Full Stack Application"
echo "=============================================="

# Check if both directories exist
if [ ! -d "backend" ] || [ ! -d "node_modules" ] || [ ! -d "backend/node_modules" ]; then
    echo "❌ Dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

# Check if concurrently is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not available. Please install npm properly."
    exit 1
fi

echo "🌡️  Starting both frontend and backend servers..."
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3001"
echo "🔄 Use Ctrl+C to stop both servers"
echo ""

# Install concurrently if not available and run both servers
npx concurrently --kill-others --prefix-colors="cyan.bold,yellow.bold" \
  --names="BACKEND,FRONTEND" \
  "cd backend && npm run dev" \
  "npm run dev"