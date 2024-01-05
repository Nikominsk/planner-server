const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
  name: String,
  age: Number,
  email: String,
});

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule
