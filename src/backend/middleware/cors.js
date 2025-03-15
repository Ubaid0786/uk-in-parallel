const cors = require('cors');

// Configure CORS middleware
module.exports = cors({
  origin: true, // Allow requests from any origin
  methods: ['GET', 'POST'],
  credentials: true
}); 