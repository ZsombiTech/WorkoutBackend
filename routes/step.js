const express = require("express");
const router = express.Router();

const stepController = require("../controller/stepController");
const Steps = new stepController();

router.post("/getsteps", Steps.getDailyStep);

module.exports = router;
