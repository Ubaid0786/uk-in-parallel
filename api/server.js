// Vercel-specific server entry point
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import middleware and routes
let corsMiddleware;
let apiRoutes;

try {
  corsMiddleware = require('../src/backend/middleware/cors');
  apiRoutes = require('../src/backend/routes/api');
} catch (error) {
  console.error('Error importing middleware or routes:', error);
  // Provide fallback middleware if imports fail
  corsMiddleware = (req, res, next) => next();
  apiRoutes = express.Router();
}

// Initialize Express app
const app = express();

// Apply middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from public directory
app.use('/src', express.static(path.join(__dirname, '../src'))); // Serve static files from src directory

// Apply routes
app.use('/api', apiRoutes);

// Handle all routes for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export the Express app as a serverless function
module.exports = app; 