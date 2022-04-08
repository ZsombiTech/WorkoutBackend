const mongoose = require("mongoose");

const StatsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  sleepinghour: [{ day: String, hours: String }],
  steps: [{ day: String, step: Number }],
  distance: [{ day: String, step: Number }],
  calories: [{ day: String, step: Number }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stats", StatsSchema);
