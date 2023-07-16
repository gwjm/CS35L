#!/bin/bash

# Function to handle Ctrl+C
function cleanup() {
    echo "Terminating processes..."
    kill $frontend_pid $backend_pid
    exit 0
}

# Install frontend dependencies
npm install

# Start the frontend
npm start &
frontend_pid=$!

# Install backend dependencies
cd ./backend/
npm install

# Start the backend
nodemon start &
backend_pid=$!

# Trap Ctrl+C and call the cleanup function
trap cleanup INT

# Wait for the processes to finish
wait
