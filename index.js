const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
require("./config/passport");

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

// 設定 routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
