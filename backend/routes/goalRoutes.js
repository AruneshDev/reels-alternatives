const express = require('express');
const router = express.Router();
const { Schema, model } = require('mongoose');

// Goals schema
const goalSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String },
  deadline: { type: Date },
  priority: { type: String, default: 'Low' },
  completed: { type: Boolean, default: false },
});

const Goal = model('Goal', goalSchema);

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goals.' });
  }
});

// Add a new goal
router.post('/', async (req, res) => {
  try {
    const { name, category, deadline, priority } = req.body;
    const newGoal = new Goal({ name, category, deadline, priority });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add goal.' });
  }
});

// Mark a goal as complete
router.put('/:id/complete', async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark goal as complete.' });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Goal deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete goal.' });
  }
});

module.exports = router;
