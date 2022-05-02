const jwt = require("jsonwebtoken");
const CalorieModel = require("../model/calorieModel");

class CalorieController {
  getCalories = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;

      CalorieModel.find({ username: username }, (err, docs) => {
        const size = docs[0].steps.length;
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
        if (docs[0].steps[size - 1].date == full) {
          res.json(docs[0].steps[size - 1]);
        } else {
          res.json("no");
        }
      });
    });
  };
  addDailyCalorie = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      const stepcount = req.body.stepcount;

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
        let sizee = docs[0].steps.length;
        let last = docs[0].steps[sizee - 1];
        let id = last.id;
        const newstep = {
          id: id + 1,
          stepcount: parseInt(stepcount),
          date: full,
        };

        CalorieModel.findOneAndUpdate(
          { username: username },
          { $push: { steps: newstep } },
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
        for (let i = 0; i < docs[0].steps.length; i++) {
          full += docs[0].steps[i].stepcount;
        }
        const average = full / docs[0].steps.length;
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
        for (let i = 0; i < docs[0].steps.length; i++) {
          full += docs[0].steps[i].stepcount;
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
