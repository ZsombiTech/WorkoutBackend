const express = require("express");
const cors = require("cors");
const connectdb = require("./config/database");
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const profileRoutes = require("./routes/profile");
const taskRoutes = require("./routes/tasks");
const stepRoutes = require("./routes/step");
const tokenverify = require("./middleware/verifyToken");

const app = express();

app.use(cors());

connectdb();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", statsRoutes);
app.use("/", profileRoutes);
app.use("/", taskRoutes);
app.use("/", stepRoutes);

app.listen(8000);
