const express = require("express");
const router = express.Router();

const stepController = require("../controller/stepController");
const Steps = new stepController();

router.post("/getcalories", Steps.getCalories);

router.post("/addcalories", Steps.addDailyCalorie);

router.post("/getavgcal", Steps.addAverageCalorie);

router.post("/getoverallcal", Steps.addOverallCalorie);

module.exports = router;
