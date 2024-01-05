const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dayPropertySchema = new Schema({

    date: {
      type: String,
    }, 
    isOfflineDay: {
      type: Boolean,
    }
    
})

const lessonSchema = new Schema({
    name: {
      type: String,
    }, 
    category: {
      type: String,
    }, 
    optionalText: {
      type: String,
    }, 
})

const lessonsSchema = new Schema({
    monday: lessonSchema,
    tuesday: lessonSchema,
    wednesday: lessonSchema,
    thursday: lessonSchema,
    friday: lessonSchema,
})

const scheduleSchema = new Schema({
  days: {
    monday: dayPropertySchema,
    tuesday: dayPropertySchema,
    wednesday: dayPropertySchema,
    thursday: dayPropertySchema,
    friday: dayPropertySchema
  },

  schedule: {
    eightOClock: lessonsSchema,
    nineOClock: lessonsSchema,
    tenOClock: lessonsSchema,
    elevenOClock: lessonsSchema,
  }

});

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule
