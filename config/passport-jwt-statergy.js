const passport = require("passport");
const JWTStatergy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial",
};

passport.use(
  new JWTStatergy(opts, function (JWTPayload, done) {
    User.findById(JWTPayload._id, function (err, user) {
      if (err) {
        console.log("Error in finding user");
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);

module.exports = passport;