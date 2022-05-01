const jwt = require("jsonwebtoken");
const StepModel = require("../model/stepModel");

class StepController {
  getDailyStep = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
    });
  };
}
module.exports = StepController;
