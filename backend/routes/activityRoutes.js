const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new activity
router.post('/', async (req, res) => {
  const { title, description, category, imageUrl } = req.body;
  const activity = new Activity({ title, description, category, imageUrl });

  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
