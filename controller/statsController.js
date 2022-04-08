const jwt = require("jsonwebtoken");
const StatsModel = require("../model/statsModel");

class Stats {
  setDatas = async (req, res, next) => {
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

    console.log("lefut");
  };
  getDatas = async (req, res, next) => {
    const _id = "625084ddaea004b95ea16dfe";

    StatsModel.findById({ _id: _id }, async function (err, docs) {
      console.log(docs);
    });

    console.log("lefut");
  };
}

module.exports = Stats;
