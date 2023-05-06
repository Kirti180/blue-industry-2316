const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: "918752788272-fh9k9imtnfolqu7p7e6cbm34ip8rkkk8.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8080/google/callback"
},
  function  verify(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    cb(null, profile)

  }
));
