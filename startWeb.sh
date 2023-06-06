#!/bin/bash
npm install

# Start the frontend
npm start &

# Start the backend
cd ./backend/
npm install
nodemon start
