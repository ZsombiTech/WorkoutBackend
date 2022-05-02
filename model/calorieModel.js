const mongoose = require("mongoose");

const CaloriesSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  calories: [
    {
      id: Number,
      calorie: Number,
      date: String,
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Calories", CaloriesSchema);
