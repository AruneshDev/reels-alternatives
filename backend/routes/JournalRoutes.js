const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Journal schema
const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Journal = mongoose.model('Journal', journalSchema);

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await Journal.find();
    res.json(entries);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch journal entries.' });
  }
});

// Add a new journal entry
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const entry = new Journal({ title, content });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).send({ error: 'Failed to save journal entry.' });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete journal entry.' });
  }
});

module.exports = router;
