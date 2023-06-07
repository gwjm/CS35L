#!/bin/bash
npm install

# Start the frontend
npm start &

# Start the backend
# shellcheck disable=SC2164
cd ./backend/
npm install
nodemon start
