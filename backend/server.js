const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // MongoDB connection

// Load environment variables
dotenv.config();

// Import route files
const activityRoutes = require('./routes/activityRoutes');
const journalRoutes = require('./routes/JournalRoutes');
const deepWorkRoutes = require('./routes/DeepworkRoutes');
const eventRoutes = require('./routes/EventRoutes');
const goalsRoutes = require('./routes/goalRoutes');

// Initialize Express app
const app = express();

// Define server port
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/backend/photos', express.static(path.join(__dirname, 'photos'))); // Serve static files

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Register routes
app.use('/api/goals', goalsRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/deep-work', deepWorkRoutes);
app.use('/api/events', eventRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
