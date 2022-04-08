const mongoose = require("mongoose");

const StatsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  sleepinghour: [{ day: String, hours: String }],
  steps: [{ day: String, step: Number }],
  distance: [{ day: String, distance: Number }],
  calories: [{ day: String, calories: Number }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stats", StatsSchema);
