// Simple Vercel deployment helper script
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\x1b[36m%s\x1b[0m', '🚀 Vercel Deployment Helper');
console.log('\x1b[33m%s\x1b[0m', 'This script will help you deploy your application to Vercel.');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('\x1b[32m%s\x1b[0m', '✅ Vercel CLI is installed.');
} catch (error) {
  console.log('\x1b[31m%s\x1b[0m', '❌ Vercel CLI is not installed.');
  console.log('\x1b[33m%s\x1b[0m', 'Installing Vercel CLI globally...');
  
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('\x1b[32m%s\x1b[0m', '✅ Vercel CLI installed successfully.');
  } catch (installError) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to install Vercel CLI.');
    console.error('\x1b[31m%s\x1b[0m', 'Please install it manually with: npm install -g vercel');
    process.exit(1);
  }
}

// Ask for deployment environment
rl.question('\x1b[36m%s\x1b[0m', 'Deploy to production? (y/n): ', (answer) => {
  const isProd = answer.toLowerCase() === 'y';
  
  console.log('\x1b[33m%s\x1b[0m', `Deploying to ${isProd ? 'production' : 'preview'}...`);
  
  try {
    // Run the appropriate Vercel command
    if (isProd) {
      execSync('vercel --prod', { stdio: 'inherit' });
    } else {
      execSync('vercel', { stdio: 'inherit' });
    }
    
    console.log('\x1b[32m%s\x1b[0m', '✅ Deployment initiated successfully!');
    console.log('\x1b[36m%s\x1b[0m', 'Follow the instructions in the terminal to complete the deployment.');
  } catch (deployError) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Deployment failed.');
    console.error('\x1b[31m%s\x1b[0m', 'Please check the error message above and try again.');
  }
  
  rl.close();
}); 