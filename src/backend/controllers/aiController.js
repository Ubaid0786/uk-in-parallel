// Load required modules
const fetch = require('node-fetch');
const envUtils = require('../utils/env');

/**
 * Controller for AI assistant functionality
 */

// Handle AI assistant request
exports.processAIRequest = async (req, res) => {
  try {
    const { inputs } = req.body;
    
    // Get API token from environment variable using our utility
    const API_TOKEN = envUtils.get('HUGGINGFACE_API_TOKEN');
    
    if (!API_TOKEN) {
      console.log('No Hugging Face API token found in environment variables');
      return res.status(200).json({ 
        error: 'API token not configured on server', 
        fallback: true,
        generated_text: "Sorry, the AI service isn't configured yet. Please set up your API key in the .env file."
      });
    }
    
    console.log('Making request to Hugging Face API...');
    // Make request to Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ inputs })
      }
    );
    
    if (!response.ok) {
      console.error(`Hugging Face API returned status ${response.status}`);
      throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully received response from Hugging Face API');
    
    // Process the response using the cleanup utility
    if (data && data.generated_text) {
      res.json({ 
        generated_text: cleanupResponse(data.generated_text)
      });
    } 
    // If we have an array format (common with some models)
    else if (Array.isArray(data) && data.length > 0) {
      let responseText = data[0].generated_text || data[0];
      res.json({ 
        generated_text: cleanupResponse(responseText)
      });
    }
    // Handle other formats by providing a standard format
    else {
      let responseText = typeof data === 'string' ? data : JSON.stringify(data);
      res.json({ 
        generated_text: cleanupResponse(responseText)
      });
    }
    
  } catch (error) {
    console.error('Error calling AI API:', error);
    res.status(200).json({ 
      error: error.message,
      fallback: true,
      generated_text: "There was an error communicating with the AI service. Using fallback responses instead."
    });
  }
};

// Helper function to clean up the AI response
function cleanupResponse(text) {
  if (!text) return text;
  
  // Remove the system prompt and instructions
  if (text.includes('[INST]')) {
    const instEndIndex = text.indexOf('[/INST]');
    if (instEndIndex !== -1) {
      text = text.substring(instEndIndex + 7).trim();
    } else {
      // If can't find the end marker, find a different way to extract the response
      const promptEndMarkers = [
        "Now give me your most SAVAGE, HILARIOUS response:",
        "The user has asked:",
        "HILARIOUS response:"
      ];
      
      for (const marker of promptEndMarkers) {
        const markerIndex = text.indexOf(marker);
        if (markerIndex !== -1) {
          // Find the end of the line containing the marker
          const lineEndIndex = text.indexOf('\n', markerIndex);
          if (lineEndIndex !== -1) {
            text = text.substring(lineEndIndex + 1).trim();
            break;
          }
        }
      }
    }
  }
  
  // Clean up any remaining markers or formatting
  text = text.replace(/\[\/INST\]/g, '')
            .replace(/<s>/g, '')
            .replace(/<\/s>/g, '')
            .trim();
  
  return text;
} 