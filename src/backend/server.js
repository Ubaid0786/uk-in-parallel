// Load dependencies
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const net = require('net');

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
const DEFAULT_PORT = process.env.PORT || 3002;

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

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is in use
      } else {
        resolve(false); // Some other error
      }
    });
    
    server.once('listening', () => {
      // Close the server if it starts listening
      server.close();
      resolve(false); // Port is not in use
    });
    
    server.listen(port);
  });
}

// Function to find an available port
async function findAvailablePort(startPort) {
  let port = startPort;
  while (await isPortInUse(port)) {
    console.log(`Port ${port} is already in use, trying ${port + 1}...`);
    port++;
  }
  return port;
}

// Start server with dynamic port
async function startServer() {
  try {
    const port = await findAvailablePort(DEFAULT_PORT);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer(); 