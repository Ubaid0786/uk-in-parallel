const cors = require('cors');

// Configure CORS middleware
module.exports = cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}); 