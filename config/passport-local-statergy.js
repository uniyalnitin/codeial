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
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.error.bind(console, "Error in finding User!");
      return done(err);
    }
    return done(null, user);
  });
});

// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signedIn, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signedIn user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  return next();
};
module.exports = passport;
