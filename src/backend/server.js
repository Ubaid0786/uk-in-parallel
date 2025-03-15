// Load dependencies
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const net = require('net');

// Load environment variables from .env file
const result = dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  // Continue anyway, as environment variables might be set in the deployment platform
} else {
  console.log('.env file loaded successfully');
  console.log('HUGGINGFACE_API_TOKEN exists:', !!process.env.HUGGINGFACE_API_TOKEN);
}

// Import middleware and routes
let corsMiddleware;
let apiRoutes;

try {
  corsMiddleware = require('./middleware/cors');
  apiRoutes = require('./routes/api');
} catch (error) {
  console.error('Error importing middleware or routes:', error);
  // Provide fallback middleware if imports fail
  corsMiddleware = (req, res, next) => next();
  apiRoutes = express.Router();
}

// Initialize Express app
const app = express();
const DEFAULT_PORT = process.env.PORT || 10000; // Use 10000 as default for Render

// Apply middleware
app.use(corsMiddleware);
app.use(express.json());

// Serve static files with proper MIME types
app.use(express.static(path.join(__dirname, '../../public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Serve files from src directory
app.use('/src', express.static(path.join(__dirname, '../../src'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Apply routes
app.use('/api', apiRoutes);

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// For deployment
if (process.env.NODE_ENV === 'production') {
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
  // In production, always use the provided port
  if (process.env.NODE_ENV === 'production') {
    return startPort;
  }
  
  // In development, find an available port
  let port = startPort;
  let attempts = 0;
  const MAX_ATTEMPTS = 20;
  
  while (attempts < MAX_ATTEMPTS && await isPortInUse(port)) {
    console.log(`Port ${port} is already in use, trying ${port + 1}...`);
    port++;
    attempts++;
  }
  
  if (attempts >= MAX_ATTEMPTS) {
    console.error(`Could not find an available port after ${MAX_ATTEMPTS} attempts.`);
    return startPort; // Return the original port and let the error happen
  }
  
  return port;
}

// Start server with dynamic port
async function startServer() {
  try {
    const port = await findAvailablePort(DEFAULT_PORT);
    
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      
      if (process.env.NODE_ENV === 'production') {
        console.log('Running in production mode');
      } else {
        console.log('Running in development mode');
      }
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try a different port.`);
        process.exit(1);
      }
    });
    
    // Handle process termination
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer(); 