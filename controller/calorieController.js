const jwt = require("jsonwebtoken");
const CalorieModel = require("../model/calorieModel");

class CalorieController {
  getCalories = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;

      CalorieModel.find({ username: username }, (err, docs) => {
        const size = docs[0].calories.length;
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
        if (docs[0].calories[size - 1].date == full) {
          res.json(docs[0].calories[size - 1]);
        } else {
          res.json("no");
        }
      });
    });
  };
  addDailyCalorie = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      const calories = req.body.calories;

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
      CalorieModel.find({ username: username }, (err, docs) => {
        let sizee = docs[0].calories.length;
        let last = docs[0].calories[sizee - 1];
        let id = last.id;
        const newcalorie = {
          id: id + 1,
          calorie: parseInt(calories),
          date: full,
        };

        CalorieModel.findOneAndUpdate(
          { username: username },
          { $push: { calories: newcalorie } },
          (err, docs2) => {
            console.log(docs2);
          }
        );
      });
    });
  };
  addAverageCalorie = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      CalorieModel.find({ username: username }, (err, docs) => {
        let full = 0;
        for (let i = 0; i < docs[0].calories.length; i++) {
          full += docs[0].calories[i].calorie;
        }
        const average = full / (docs[0].calories.length - 1);
        if (average) {
          res.json(average);
        } else {
          res.json("no");
        }
      });
    });
  };
  addOverallCalorie = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      CalorieModel.find({ username: username }, (err, docs) => {
        let full = 0;
        for (let i = 0; i < docs[0].calories.length; i++) {
          full += docs[0].calories[i].calorie;
        }
        if (full) {
          res.json(full);
        } else {
          res.json("no");
        }
      });
    });
  };
}
module.exports = CalorieController;
