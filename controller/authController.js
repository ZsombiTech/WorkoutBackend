const jwt = require("jsonwebtoken");
const LoginModel = require("../model/authModel");
const TokenModel = require("../model/Tokens");

class Auth {
  register = async (req, res, next) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    LoginModel.find(
      { username: user.username },
      "username",
      async (err, docs) => {
        if (docs.length > 0) {
          res.json({ response: "Already exits" });
        } else {
          const post = new LoginModel(user);
          const savedPost = await post.save();
          jwt.sign({ user }, "secretkey", async (err, token) => {
            const usertoken = new TokenModel({ token });
            const savedtoken = await usertoken.save();
            res.json({ token });
          });
        }
      }
    );
  };

  login = async (req, res, next) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };

    LoginModel.find({ username: user.username }, (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          if (user.password == docs[0].password) {
            jwt.sign({ user }, "secretkey", async (err, token) => {
              const usertoken = new TokenModel({ token });
              const savedtoken = await usertoken.save();
              res.json({
                response: "correct",
                token,
              });
            });
          } else {
            res.json({ response: "Incorrect password" });
          }
        } else {
          res.json({ response: "No user with this username" });
        }
      } else {
        res.json({ response: "Something went wrong" });
      }
    });
  };
}

module.exports = Auth;
