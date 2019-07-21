require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const db = require("../models");

passport.serializeUser((user, done) => {
  done(null, user[0].dataValues.googleId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.User.findOne({ where: { googleId: id } });
    done(null, user);
  } catch (error) {
    console.error(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await db.User.findOrCreate({
          where: {
            googleId: profile.id,
            username: profile.displayName,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName
          },
          defaults: {
            googleId: profile.id,
            username: profile.displayName,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName
          }
        });
        return done(null, user);
      } catch (error) {
        console.error(error);
      }
    }
  )
);

module.exports = passport;
