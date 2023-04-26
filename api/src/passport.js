const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("./db.js");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  URL_CALLBACK,
} = process.env;

// Estrategia Local

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const photo = profile.photos[0].value;
      try {
        let user = await User.findOne({ where: { email } });
        if (!user) {
          const name = profile.name.givenName;
          const lastName = profile.name.familyName;
          user = await User.create({
            email,
            name,
            name,
            lastName,
            photo,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: URL_CALLBACK,
      profileFields: ["emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      try {
        let user = await User.findOne({ where: { email } });
        if (!user) {
          const name = profile.name.givenName;
          const lastName = profile.name.familyName;
          user = await User.create({
            email,
            name,
            lastName,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialización del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialización del usuario
passport.deserializeUser(async (user, done) => {
  done(null, user);
});

module.exports = { passport };
