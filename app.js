const express = require("express");
const cors = require("cors");
const connectdb = require("./config/database");
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const profileRoutes = require("./routes/profile");
const taskRoutes = require("./routes/tasks");
const stepRoutes = require("./routes/step");
const caloriesRoutes = require("./routes/calorie");
const foodRoutes = require("./routes/food");
const tokenverify = require("./middleware/verifyToken");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

const app = express();

connectdb();

/*app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    stored: false,
    cookie: { secure: true, maxAge: 10000 },
  })
);*/

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());

app.use(limiter);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", tokenverify, statsRoutes);
app.use("/", tokenverify, profileRoutes);
app.use("/", tokenverify, taskRoutes);
app.use("/", tokenverify, stepRoutes);
app.use("/", tokenverify, caloriesRoutes);
app.use("/", tokenverify, foodRoutes);

app.listen(8000);
