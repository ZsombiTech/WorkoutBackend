const jwt = require("jsonwebtoken");
const TaskModel = require("../model/taskModel");

class TaskController {
  addTask = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      const description = req.body.description;
      let id = 0;
      let tasks = [];

      TaskModel.find({ username: username }, (err, docs) => {
        tasks = docs[0].tasks;
        const sizee = tasks.length;
        id = tasks[sizee - 1].id;
        const newpo = {
          id: id + 1,
          description: description,
        };

        TaskModel.findOneAndUpdate(
          { username: username },
          { $push: { tasks: newpo } },
          (err, docs) => {
            res.json("siker");
          }
        );
      });
    });
  };
  getTask = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      let username = req.params.username;
      console.log("keres");
      TaskModel.find({ username: username }, (err, docs) => {
        res.json(docs);
      });
    });
  };
  deleteTask = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const description = req.body.description;
      const username = req.body.username;
      TaskModel.findOneAndUpdate(
        { username: username },
        { $set: { "tasks.$[elem1].completed": true } },
        {
          arrayFilters: [{ "elem1.description": description }],
        },
        (err, docs) => {}
      );
    });
  };
}
module.exports = TaskController;
