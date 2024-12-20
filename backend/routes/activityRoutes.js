const express = require('express');
const router = express.Router();

// Mock data
const activities = [
  { id: 1, name: 'Go for a walk', type: 'outdoor' },
  { id: 2, name: 'Read a book', type: 'indoor' },
  { id: 3, name: 'Play a sport', type: 'outdoor' },
];

// GET /api/activities
router.get('/', (req, res) => {
  res.status(200).json(activities);
});

module.exports = router;
