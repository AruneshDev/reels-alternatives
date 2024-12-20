const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // 'indoor' or 'outdoor'
  imageUrl: { type: String },
});

module.exports = mongoose.model('Activity', activitySchema);
