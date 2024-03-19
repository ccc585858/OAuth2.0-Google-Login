const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get(
  "/google",
  // passport.authenticate() 本身為一個 middleware
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // 到登入頁面時，每次都可以選擇一個帳號登入
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  return res.redirect("/profile");
});

module.exports = router;
