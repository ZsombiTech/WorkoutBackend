const jwt = require("jsonwebtoken");
const UserModel = require("../model/authModel");
const TokenModel = require("../model/tokenModel");

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
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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
        jwt.sign({ user }, "secretkey", async (err, token) => {
          const usertoken = new TokenModel({ token });
          const savedtoken = await usertoken.save();
          res.json({ token: token, response: "correct" });
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
