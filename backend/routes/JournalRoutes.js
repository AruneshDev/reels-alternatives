const express = require('express');
const router = express.Router();

let journalEntries = []; // In-memory storage for demo. Use a database in production.

// Save a journal entry
router.post('/save', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const entry = {
    id: journalEntries.length + 1,
    title,
    content,
    date: new Date().toISOString(),
  };

  journalEntries.push(entry);
  res.status(201).json({ message: 'Journal entry saved', entry });
});

// Get all journal entries
router.get('/', (req, res) => {
  res.status(200).json(journalEntries);
});

// Delete a journal entry by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const entryIndex = journalEntries.findIndex((entry) => entry.id === parseInt(id));

  if (entryIndex === -1) {
    return res.status(404).json({ message: 'Journal entry not found' });
  }

  journalEntries.splice(entryIndex, 1);
  res.status(200).json({ message: 'Journal entry deleted successfully' });
});

module.exports = router;
