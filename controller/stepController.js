const jwt = require("jsonwebtoken");
const StepModel = require("../model/stepModel");

class StepController {
  getDailyStep = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
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
}
module.exports = StepController;
