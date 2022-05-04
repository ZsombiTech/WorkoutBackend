const jwt = require("jsonwebtoken");
const UserModel = require("../model/authModel");
const TokenModel = require("../model/tokenModel");
const StepModel = require("../model/stepModel");
const CalorieModel = require("../model/calorieModel");
const TaskModel = require("../model/taskModel");
const FoodModel = require("../model/foodModel");

class Auth {
  verify = async (req, res, next) => {
    if (req.token != null) {
      jwt.verify(req.token, "secretkey", async (err, authData) => {
        res.json({ response: "Good" });
        console.log("okes");
      });
    }
  };
  register = async (req, res, next) => {
    const date = new Date();
    const year = date.getUTCFullYear();
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    const full = year + "-" + month + "-" + day;
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const basicStep = {
      username: req.body.username,
      steps: [{ id: 1, stepcount: 0, date: full }],
    };
    const basicCalorie = {
      username: req.body.username,
      calories: [{ id: 1, calorie: 0, date: full }],
    };
    const basicFood = {
      username: req.body.username,
      food: [],
    };
    const basicTask = {
      username: req.body.username,
      tasks: [
        { id: 1, description: "Complete registration", completed: false },
      ],
    };

    console.log("lefut");
    UserModel.find({ email: user.email }, "username", async (err, docs) => {
      if (docs.length > 0) {
        console.log("lefut");
        res.json({ response: "Already exits" });
      } else {
        console.log("lefut");
        const post = new UserModel(user);
        const savedPost = await post.save();
        const newStep = new StepModel(basicStep);
        const savedStep = await newStep.save();
        const newCalorie = new CalorieModel(basicCalorie);
        const savedCalorie = await newCalorie.save();
        const newTask = new TaskModel(basicTask);
        const savedTask = await newTask.save();
        const newFood = new FoodModel(basicFood);
        const savedFood = await newFood.save();
        jwt.sign({ user }, "secretkey", async (err, token) => {
          const usertoken = new TokenModel({ token });
          const savedtoken = await usertoken.save();

          UserModel.find({ email: user.email }, async (err, user) => {
            res.json({
              token: token,
              userid: user[0]._id,
              response: "correct",
            });
          });
        });
      }
    });
  };

  login = async (req, res, next) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    UserModel.find({ email: user.email }, (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          if (user.password == docs[0].password) {
            jwt.sign({ user }, "secretkey", async (err, token) => {
              const usertoken = new TokenModel({ token });
              const savedtoken = await usertoken.save();
              res.json({
                response: "correct",
                token,
                userid: docs[0]._id,
                displayName: docs[0].username,
              });
            });
          } else {
            res.json({ response: "Incorrect password" });
          }
        } else {
          res.json({ response: "No user with this email" });
        }
      } else {
        res.json({ response: "Something went wrong" });
      }
    });
  };
}

module.exports = Auth;
