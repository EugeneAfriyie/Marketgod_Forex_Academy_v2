const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Allows your React frontend to talk to this API
app.use(express.json()); // Allows your API to read JSON data sent in requests

// Our very first API Route!
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MarketGod Forex Academy API!' });
});

// Turn the server on
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});