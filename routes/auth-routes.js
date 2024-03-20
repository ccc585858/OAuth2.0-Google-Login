const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  return res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return res.send(err);
    return res.redirect("/");
  });
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
  console.log("進入 redirect 區域");
  return res.redirect("/profile");
});

module.exports = router;
