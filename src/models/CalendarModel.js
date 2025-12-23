const mongoose = require('mongoose');

// Flexible schema to accept any calendar payload as-is
const calendarSchema = new mongoose.Schema(
  {
    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;


