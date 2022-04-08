const express = require("express");
const cors = require("cors");
const connectdb = require("./config/database");

const app = express();

app.use(cors());

connectdb();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(express.json());

app.listen(8000);
