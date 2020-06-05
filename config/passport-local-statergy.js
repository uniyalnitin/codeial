const passport = require("passport");
const User = require("../models/user");
const LocalStatergy = require("passport-local").Strategy;

passport.use(
  new LocalStatergy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.error.bind(console, "Error in finding User!");
          return done(err);
        }
        if (!user || user.password != password) {
          console.error.bind(console, "Username, Password doesn't match");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// Deserializing the cookies to get the User
passport.deserializeUser(function (id) {
  User.findById(id, function (err, user) {
    if (err) {
      console.error.bind(console, "Error in finding User!");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;
