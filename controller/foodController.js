const jwt = require("jsonwebtoken");
const FoodModel = require("../model/foodModel");

class FoodController {
  getTable = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;

      FoodModel.find({ username: username }, (err, docs) => {
        if (docs.length > 0) {
          res.json(docs);
        }
      });
    });
  };
  addTable = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const username = req.body.username;
      const foodname = req.body.foodname;
      const calories = req.body.calories;
      const amount = req.body.amount;

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
      FoodModel.find({ username: username }, (err, docs) => {
        const newfood = {
          foodname: foodname,
          calories: calories,
          amount: amount,
          date: full,
        };

        FoodModel.findOneAndUpdate(
          { username: username },
          { $push: { food: newfood } },
          (err, docs2) => {
            console.log(docs2);
          }
        );
      });
    });
  };
}
module.exports = FoodController;
