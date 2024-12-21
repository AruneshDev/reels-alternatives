const express = require('express');
const cors = require('cors');
const path = require('path');
const activityRoutes = require('./routes/activityRoutes');
const journalRoutes = require('./routes/JournalRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve static files (e.g., images from the "photos" folder)
app.use('/backend/photos', express.static(path.join(__dirname, 'photos')));

// Use activity routes
app.use('/api/activities', activityRoutes);

// Use journal routes
app.use('/api/journal', journalRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
