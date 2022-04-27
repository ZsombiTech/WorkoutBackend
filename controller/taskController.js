const jwt = require("jsonwebtoken");
const TaskModel = require("../model/taskModel");

class TaskContoller {
  addTask = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {});
  };
}
module.exports = TaskContoller;
