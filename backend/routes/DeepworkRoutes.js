const express = require('express');
const router = express.Router();

let deepWorkTasks = []; // Temporary in-memory storage for tasks

// Add a new task
router.post('/add', (req, res) => {
  const { taskName, duration } = req.body;

  if (!taskName || !duration) {
    return res.status(400).json({ message: 'Task name and duration are required' });
  }

  const task = {
    id: deepWorkTasks.length + 1,
    taskName,
    duration,
    completed: false,
    startTime: null,
    endTime: null,
  };

  deepWorkTasks.push(task);
  res.status(201).json({ message: 'Task added successfully', task });
});

// Get all tasks
router.get('/', (req, res) => {
  res.status(200).json(deepWorkTasks);
});

// Mark a task as completed
router.put('/complete/:id', (req, res) => {
  const { id } = req.params;
  const task = deepWorkTasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.completed = true;
  task.endTime = new Date().toISOString();
  res.status(200).json({ message: 'Task marked as completed', task });
});

module.exports = router;
// Delete a task by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = deepWorkTasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  deepWorkTasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
});

