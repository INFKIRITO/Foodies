const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./db');
connectDB();

// Use CORS for handling cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Middleware to parse JSON
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// API Routes
app.use('/api', require('./Routes/CreateUser'));
// app.use('/api', require('./Routes/DisplayData'));

// Start the server
app.listen(5000, () => {
  console.log('app listening on port 5000');
});
