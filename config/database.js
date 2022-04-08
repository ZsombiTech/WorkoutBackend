const mongoose = require("mongoose");
require("dotenv/config");

const connect = () => {
  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("Connected");
  });
};

module.exports = connect;
