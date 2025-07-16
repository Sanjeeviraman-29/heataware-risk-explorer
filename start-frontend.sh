#!/bin/bash

echo "🚀 Starting HeatAware Frontend..."
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Frontend dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

# Start the frontend development server
echo "🌡️  Starting frontend development server..."
echo "📱 Frontend will be available at http://localhost:5173"
echo "🔄 Use Ctrl+C to stop the server"
echo ""

npm run dev