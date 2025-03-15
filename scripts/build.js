// Build script for Vercel deployment
console.log('Starting build process...');

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';
console.log(`Running in Vercel environment: ${isVercel ? 'Yes' : 'No'}`);

// Log environment information
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Create any necessary directories or files for deployment
const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Ensure the api directory exists
const apiDir = path.join(process.cwd(), 'api');
if (!fs.existsSync(apiDir)) {
  console.log('Creating api directory...');
  fs.mkdirSync(apiDir, { recursive: true });
}

console.log('Build process completed successfully!'); 