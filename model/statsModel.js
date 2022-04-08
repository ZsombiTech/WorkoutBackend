const mongoose = require("mongoose");

const StatsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  sleepinghour: [{ day: String, hours: String }],
  steps: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0,
  },
  calories: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stats", StatsSchema);
