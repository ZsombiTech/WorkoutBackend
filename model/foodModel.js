const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  food: [{ foodname: String, calories: Number, amount: Number, date: String }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
