const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  // 這邊的 done 和下面的 done 並無關聯
  console.log("Serialize 使用者...");
  // console.log(user);
  done(null, user._id);
  /**
   * 第 9 行是在將 mongoDB 的 id，存在 session
   * 並且將 id 簽名後，以 Cookie 的形式給使用者...
   */
});

passport.deserializeUser(async (_id, done) => {
  console.log(
    "Deserializer 使用者...使用 SerializeUser 儲存的 id，去找到資料庫內的資料"
  );
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); // 將 req.user 這個屬性設定為 foundUser
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Google_CLIENT_ID,
      clientSecret: process.env.Google_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    }, // function...
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入 Google Strategy 的區域");
      // console.log(profile);
      // console.log("------------------------");
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("使用者已註冊，無須存入資料庫內。");
        done(null, foundUser);
      } else {
        let newUser = new User({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });

        let saveUser = await newUser.save();
        console.log("成功創建新用戶。");
        done(null, saveUser);
      }
    }
  )
);
