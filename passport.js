const bcrypt = require("bcryptjs");
const passport = require("passport");
const kakaoStrategy = require("passport-kakao").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/User");

const clientID = process.env.clientID;
const callbackURL = process.env.callbackURL;

passport.use(
  "kakao",
  new kakaoStrategy(
    {
      clientID,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id.toString();
      let user;
      try {
        const userExist = await User.findOne({ id });
        if (userExist) {
          user = userExist;
        } else {
          user = new User({
            id,
            username: "User",
          });
          await user.save();
        }
        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(id, salt);
        return done(null, { token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
