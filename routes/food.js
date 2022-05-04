const express = require("express");
const router = express.Router();

const foodController = require("../controller/foodController");
const Food = new foodController();

router.get("/gettable", Food.getTable);

router.post("/addtable", Food.addTable);

module.exports = router;
