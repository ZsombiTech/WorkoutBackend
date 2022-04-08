const jwt = require("jsonwebtoken");
const StatsModel = require("../model/statsModel");

class Stats {
  setDatas = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const _id = "625084ddaea004b95ea16dfe";
      const user = {
        day: "2022.08.47",
        hours: 2,
      };

      StatsModel.findByIdAndUpdate(
        { _id: _id },
        { $push: { sleepinghour: user } },
        (err, docs) => {
          console.log("siker");
        }
      );

      const step = {
        day: "2022.08.47",
        step: 2,
      };

      StatsModel.findByIdAndUpdate(
        { _id: _id },
        { $push: { steps: step } },
        (err, docs) => {
          console.log("siker");
        }
      );

      const distance = {
        day: "2022.08.47",
        distance: 2,
      };

      StatsModel.findByIdAndUpdate(
        { _id: _id },
        { $push: { distance: distance } },
        (err, docs) => {
          console.log("siker");
        }
      );

      const calories = {
        day: "2022.08.47",
        calories: 2,
      };

      StatsModel.findByIdAndUpdate(
        { _id: _id },
        { $push: { calories: calories } },

        (err, docs) => {
          console.log("siker");
        }
      );

      console.log("lefut");
    });
  };

  getDatas = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const _id = "625084ddaea004b95ea16dfe";

      StatsModel.findById({ _id: _id }, async function (err, docs) {
        console.log(docs);
      });

      console.log("lefut");
    });
  };
}
module.exports = Stats;
