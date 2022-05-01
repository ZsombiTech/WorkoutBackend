const jwt = require("jsonwebtoken");
const StepModel = require("../model/stepModel");

class StepController {
  getDailyStep = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      console.log(username);
      StepModel.find({ username: username }, (err, docs) => {
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
  addDailyStep = async (req, res, next) => {
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
      StepModel.find({ username: username }, (err, docs) => {
        let sizee = docs[0].steps.length;
        let last = docs[0].steps[sizee - 1];
        let id = last.id;
        const newstep = {
          id: id + 1,
          step: stepcount,
          date: full,
        };
        StepModel.findOneAndUpdate(
          { username: username },
          { $push: { steps: newstep } }
        );
      });
    });
  };
}
module.exports = StepController;
