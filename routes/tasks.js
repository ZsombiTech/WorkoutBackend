const express = require("express");
const router = express.Router();

const TaskController = require("../controller/taskController");
const Task = new TaskController();

router.post("/addtask", Task.addTask);

router.get("/gettask/:username", Task.getTask);

module.exports = router;
