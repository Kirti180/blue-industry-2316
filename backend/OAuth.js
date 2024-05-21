const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy
require("dotenv").config()

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:8080/google/callback"
},
  function  verify(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    cb(null, profile)

  }
));
