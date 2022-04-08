const express = require("express");
const router = express.Router();

const statsController = require("../controller/statsController");
const Stats = new statsController();

router.post("/set", Stats.setDatas);

router.post("/get", Stats.getDatas);

module.exports = router;
