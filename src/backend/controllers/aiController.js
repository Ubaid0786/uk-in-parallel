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
    
    if (!inputs) {
      return res.status(400).json({ 
        error: 'Missing inputs in request body',
        fallback: true,
        generated_text: "I need something to respond to! Ask me a question or tell me something."
      });
    }
    
    // Get API token from environment variable using our utility
    const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN || envUtils.get('HUGGINGFACE_API_TOKEN');
    
    if (!API_TOKEN) {
      console.log('No Hugging Face API token found in environment variables');
      return res.status(200).json({ 
        error: 'API token not configured on server', 
        fallback: true,
        generated_text: "Sorry, the AI service isn't configured yet. Please set up your API key in the environment variables."
      });
    }
    
    console.log('Making request to Hugging Face API...');
    
    // Set timeout for the fetch request
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000); // 10 second timeout
    
    try {
      // Make request to Hugging Face API
      const response = await fetch(
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
      );
      
      clearTimeout(timeout);
      
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
    } catch (fetchError) {
      clearTimeout(timeout);
      
      if (fetchError.name === 'AbortError') {
        console.error('Request to Hugging Face API timed out');
        return res.status(200).json({
          error: 'API request timed out',
          fallback: true,
          generated_text: "The AI service is taking too long to respond. Using fallback responses instead."
        });
      }
      
      throw fetchError;
    }
    
  } catch (error) {
    console.error('Error calling AI API:', error);
    
    // Use fallback response generator
    const fallbackResponse = generateFallbackResponse(req.body.inputs);
    
    res.status(200).json({ 
      error: error.message,
      fallback: true,
      generated_text: fallbackResponse
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

// Generate a fallback response when the AI service is unavailable
function generateFallbackResponse(question) {
  const fallbackResponses = [
    "Sorry, I'm having a brain freeze right now. Must be all those exams I failed! 🧠❄️",
    "Error 404: Intelligent response not found. Just like my academic record! 📝🔍",
    "I'd give you a smart answer, but I'm currently operating at student-after-finals intelligence levels. 🥴",
    "My AI brain cells are on strike today. They're demanding better working conditions and fewer stupid questions! 🧠✊",
    "I'm experiencing technical difficulties... much like every student trying to submit assignments at 11:59 PM! ⏱️😱",
    "Oops! My circuits are fried from trying to understand university bureaucracy. 🔥🤖",
    "I seem to be experiencing the digital equivalent of falling asleep during a lecture. 😴💤",
    "My response generator is currently as functional as the university website during course registration. 🖥️💥",
    "I'd answer your question, but I'm too busy calculating how many points I need to pass this semester. 🧮😰",
    "Sorry, I can't think straight right now. Must be all that caffeinated studying! ☕📚"
  ];
  
  // Get a random response
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
} 