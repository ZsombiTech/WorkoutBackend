const mongoose = require("mongoose");

const StepSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  steps: [
    {
      id: Number,
      stepcount: Number,
      date: { type: Date, default: Date.now },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Steps", StepSchema);
