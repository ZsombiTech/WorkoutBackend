const express = require("express");
const router = express.Router();

const calorieController = require("../controller/calorieController");
const Calories = new calorieController();

router.post("/getcalories", Calories.getCalories);

router.post("/addcalories", Calories.addDailyCalorie);

router.post("/getavgcal", Calories.addAverageCalorie);

router.post("/getoverallcal", Calories.addOverallCalorie);

module.exports = router;
