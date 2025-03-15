// Script to check if the port is already in use
const net = require('net');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3002;

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
    console.log(`Port ${port} is already in use.`);
    port++;
  }
  return port;
}

// Main function
async function main() {
  try {
    const availablePort = await findAvailablePort(PORT);
    
    if (availablePort !== PORT) {
      console.log(`\x1b[33mWarning: Port ${PORT} is already in use.\x1b[0m`);
      console.log(`\x1b[32mSuggestion: Use port ${availablePort} instead.\x1b[0m`);
      console.log(`\x1b[32mYou can update your .env file or run the server with:\x1b[0m`);
      console.log(`\x1b[36mPORT=${availablePort} npm run dev\x1b[0m`);
    } else {
      console.log(`\x1b[32mPort ${PORT} is available for use.\x1b[0m`);
    }
  } catch (error) {
    console.error('Error checking port:', error);
  }
}

// Run the main function
main(); 