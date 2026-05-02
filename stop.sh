#!/bin/bash

# Self-Evolving Agents - Stop Script
# This script stops all running services

echo "🛑 Stopping Self-Evolving Agents..."
echo ""

# Check for saved PIDs
if [ -f .pids ]; then
    echo "📋 Found saved process IDs"
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo "   Stopping process $pid..."
            kill $pid
        fi
    done < .pids
    rm .pids
fi

# Kill any remaining processes
echo "🔍 Checking for remaining processes..."

# Kill backend
BACKEND_PIDS=$(pgrep -f "python run.py")
if [ ! -z "$BACKEND_PIDS" ]; then
    echo "   Stopping backend processes: $BACKEND_PIDS"
    pkill -f "python run.py"
fi

# Kill frontend
FRONTEND_PIDS=$(pgrep -f "vite")
if [ ! -z "$FRONTEND_PIDS" ]; then
    echo "   Stopping frontend processes: $FRONTEND_PIDS"
    pkill -f "vite"
fi

# Clean up log files
if [ -f backend.log ]; then
    rm backend.log
fi

if [ -f frontend.log ]; then
    rm frontend.log
fi

echo ""
echo "✅ All services stopped"
echo ""
