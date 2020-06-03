const User = require("../models/user");

module.exports.userProfile = function (req, res) {
  return res.send("User Profile");
};

module.exports.create = function (req, res) {
  password = req.body.password;
  confirm_password = req.body.confirmPassword;

  if (password != confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in creating user while signing up");
      return res.redirect("back");
    }
    if (!user) {
      userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      User.create(userObj, function (err, user) {
        if (err) {
          console.error.bind(console, "Error while creating user");
          return res.redirect("back");
        }
        console.log("Successfully created user", user);
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.login = function (req, res) {
  return res.render("login", {
    title: "Login",
  });
};

module.exports.createSession = function (req, res) {
  name = req.body.name;
  password = req.body.password;
  User.findOne({ name: name }, function (err, user) {
    if (err) {
      console.log("Error while getting the user");
      return res.redirect("back");
    }
    if (user.password == password) {
      return res.send("Successfully Logged in");
    }
    return res.render("login", {
      title: password + " " + user.password,
    });
  });
};
