const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
require("./config/passport");
const session = require("express-session");
const passport = require("passport");

// 連結 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/GoogoleDB")
  .then(() => {
    console.log("Connect to mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

// 設定 Middlewares 以及排版引擎
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize()); // 讓 passport 運行他的驗證功能
app.use(passport.session()); // 讓 passport 可以使用 session

// 設定 routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  return res.render("index", { user: req.user });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
