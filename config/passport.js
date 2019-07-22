require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models');

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
        const { id, displayName, name } = profile;
        const user = await db.User.findOrCreate({
          where: {
            googleId: id,
            username: displayName,
            firstname: name.givenName,
            lastname: name.familyName
          },
          defaults: {
            googleId: id,
            username: displayName,
            firstname: name.givenName,
            lastname: name.familyName
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
