// Load dependencies
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
const result = dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
  console.log('HUGGINGFACE_API_TOKEN exists:', !!process.env.HUGGINGFACE_API_TOKEN);
}

// Import middleware and routes
const corsMiddleware = require('./middleware/cors');
const apiRoutes = require('./routes/api');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Apply middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public'))); // Serve static files from public directory
app.use('/src', express.static(path.join(__dirname, '../../src'))); // Serve static files from src directory

// Apply routes
app.use('/api', apiRoutes);

// For Vercel serverless deployment
if (process.env.VERCEL) {
  // Handle all routes for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 