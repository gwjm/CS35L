#!/bin/bash

# Start the frontend
npm start &

# Start the backend
cd ./backend/
nodemon start
