const express = require('express');
const activityRoutes = require('./routes/activityRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express(); // Initialize 'app' here

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "photos" folder
app.use('/backend/photos', express.static(path.join(__dirname, 'photos')));

// Register API routes
app.use('/api/activities', activityRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
