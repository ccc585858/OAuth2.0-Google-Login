const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Google_CLIENT_ID,
      clientSecret: process.env.Google_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    }, // function...
    (accessToken, refreshToken, profile, done) => {}
  )
);
