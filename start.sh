#!/bin/bash

# Self-Evolving Agents - Quick Start Script
# This script starts both backend and frontend

echo "🚀 Starting Self-Evolving Agents..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create a .env file with your OpenAI API key:"
    echo "OPENAI_API_KEY=sk-your-key-here"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists uv; then
    echo "❌ uv not found. Installing..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
fi

if ! command_exists node; then
    echo "❌ Node.js not found. Please install Node.js 20+ first."
    exit 1
fi

echo "✅ Prerequisites OK"
echo ""

# Start backend
echo "🔧 Starting backend..."
cd backend

# Install dependencies if needed
if [ ! -d ".venv" ]; then
    echo "   Installing backend dependencies..."
    uv sync
fi

# Start backend in background
uv run python run.py > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend started (PID: $BACKEND_PID)"
echo "   Logs: backend.log"

# Wait for backend to be ready
echo "   Waiting for backend to start..."
for i in {1..30}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo "   ✅ Backend ready at http://localhost:8000"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo "   ❌ Backend failed to start. Check backend.log"
        kill $BACKEND_PID
        exit 1
    fi
done

cd ..

# Start frontend
echo ""
echo "🎨 Starting frontend..."
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "   Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend started (PID: $FRONTEND_PID)"
echo "   Logs: frontend.log"

# Wait for frontend to be ready
echo "   Waiting for frontend to start..."
sleep 5

cd ..

# Print success message
echo ""
echo "✅ All services started successfully!"
echo ""
echo "📍 Access Points:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "📝 Process IDs:"
echo "   Backend:   $BACKEND_PID"
echo "   Frontend:  $FRONTEND_PID"
echo ""
echo "🛑 To stop services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   Or press Ctrl+C and run: pkill -f 'python run.py'; pkill -f 'vite'"
echo ""
echo "📊 View logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🎉 Ready to go! Open http://localhost:5173 in your browser"
echo ""

# Save PIDs to file
echo "$BACKEND_PID" > .pids
echo "$FRONTEND_PID" >> .pids

# Wait for user interrupt
echo "Press Ctrl+C to stop all services..."
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; rm .pids; echo '✅ Services stopped'; exit 0" INT

# Keep script running
wait
