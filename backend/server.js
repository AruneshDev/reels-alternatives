const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const activityRoutes = require('./routes/activityRoutes');
const journalRoutes = require('./routes/JournalRoutes');
const deepWorkRoutes = require('./routes/DeepworkRoutes');
const eventRoutes = require('./routes/EventRoutes'); // Import Event Routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve static files (e.g., images from the "photos" folder)
app.use('/backend/photos', express.static(path.join(__dirname, 'photos')));

// Register routes
app.use('/api/activities', activityRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/deep-work', deepWorkRoutes);
app.use('/api/events', eventRoutes); // Register Event Routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
