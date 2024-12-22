const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  deadline: { type: Date, required: true },
  priority: { type: String, default: "Low" },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Goals', goalSchema);
