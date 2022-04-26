const jwt = require("jsonwebtoken");
const UserModel = require("../model/authModel");

class Profile {
  setDesc = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      const description = req.body.description;
      const id = req.body.id;
      UserModel.findByIdAndUpdate(
        id,
        { description: description },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.json({ response: "Good" });
          }
        }
      );
    });
  };
  getProfileData = async (req, res, next) => {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      let id = req.params.userid;
      id = id.substring(1);

      UserModel.findById(id, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.json(docs);
        }
      });
    });
  };
}
module.exports = Profile;
