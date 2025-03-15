/**
 * Environment configuration utility
 * Handles loading and validating environment variables
 */
const path = require('path');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file
 * @returns {Object} The result of dotenv.config()
 */
exports.loadEnv = () => {
  const result = dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
    console.log('HUGGINGFACE_API_TOKEN exists:', !!process.env.HUGGINGFACE_API_TOKEN);
  }
  
  return result;
};

/**
 * Get an environment variable with validation
 * @param {string} key - The environment variable name
 * @param {*} defaultValue - Default value if the environment variable is not set
 * @returns {string} The environment variable value or default value
 */
exports.get = (key, defaultValue = null) => {
  const value = process.env[key];
  
  if (value === undefined) {
    if (defaultValue !== null) {
      return defaultValue;
    }
    console.warn(`Warning: Environment variable ${key} is not set and no default value provided`);
  }
  
  return value;
}; 