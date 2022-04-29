const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tasks: [
    {
      id: Number,
      description: String,
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
