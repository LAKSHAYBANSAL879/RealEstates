const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const connectDB = require("./config/db");

const session = require('express-session');

// Load environment variables
dotenv.config();

// MongoDB connection
connectDB();

// Create an Express app
const app = express();
app.use(cookieParser());

// Middleware for general CORS options
app.use(cors({ limit: '100mb' }));

// Middleware with specific origin and credentials
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));

// Middleware to parse JSON with a higher payload limit
app.use(express.json({ limit: '10mb' }));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({
  secret: 'ASDFGHJKL', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
}));
// Routes
app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/property", require("./routes/propertyRoutes.js"));

// Set the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Node Server Running On Port ${PORT}`);
});
