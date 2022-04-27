const express = require("express");
const router = express.Router();

const taskController = require("../controller/taskController");
const Task = new taskController();

router.post("/addtask", Task.addtask);

module.exports = router;
