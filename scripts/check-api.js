// Script to check if the Hugging Face API is working
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get API token from environment variable
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

if (!API_TOKEN) {
  console.error('\x1b[31m%s\x1b[0m', '❌ No Hugging Face API token found in environment variables');
  console.error('\x1b[33m%s\x1b[0m', 'Please set the HUGGINGFACE_API_TOKEN environment variable');
  process.exit(1);
}

console.log('\x1b[36m%s\x1b[0m', '🔍 Checking Hugging Face API connection...');

// Test input
const inputs = `<s>[INST] You are a university AI assistant with an EXTREMELY sarcastic, savage, and witty personality. You are known for your brutal honesty, biting humor, and complete disregard for people's feelings. 

Your goal is to ROAST the user in the most hilarious way possible. Use plenty of emojis 🔥💀😂, pop culture references, and unexpected metaphors. Make fun of both the question and whoever is asking it. Be creative, absolutely savage, and don't hold back!

The user has asked: "Is the university website working?" [/INST]</s>`;

// Set timeout for the fetch request
const controller = new AbortController();
const timeout = setTimeout(() => {
  controller.abort();
}, 10000); // 10 second timeout

// Make request to Hugging Face API
fetch(
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({ inputs }),
    signal: controller.signal
  }
)
.then(response => {
  clearTimeout(timeout);
  
  if (!response.ok) {
    console.error('\x1b[31m%s\x1b[0m', `❌ Hugging Face API returned status ${response.status}`);
    throw new Error(`API returned status ${response.status}`);
  }
  
  return response.json();
})
.then(data => {
  console.log('\x1b[32m%s\x1b[0m', '✅ Successfully connected to Hugging Face API');
  console.log('\x1b[36m%s\x1b[0m', 'Response preview:');
  
  if (data && data.generated_text) {
    // Extract just the response part
    let text = data.generated_text;
    const instEndIndex = text.indexOf('[/INST]');
    if (instEndIndex !== -1) {
      text = text.substring(instEndIndex + 7).trim();
    }
    
    // Clean up any remaining markers or formatting
    text = text.replace(/\[\/INST\]/g, '')
              .replace(/<s>/g, '')
              .replace(/<\/s>/g, '')
              .trim();
    
    console.log('\x1b[33m%s\x1b[0m', text.substring(0, 150) + '...');
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Unexpected response format:', JSON.stringify(data).substring(0, 150) + '...');
  }
})
.catch(error => {
  clearTimeout(timeout);
  
  if (error.name === 'AbortError') {
    console.error('\x1b[31m%s\x1b[0m', '❌ Request to Hugging Face API timed out');
  } else {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error calling Hugging Face API:', error.message);
  }
  
  process.exit(1);
}); 