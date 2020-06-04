const User = require("../models/user");

module.exports.userProfile = function (req, res) {
  let rawCookies = req.headers.cookie.split(";");
  const parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0].trim()] = parsedCookie[1].trim();
  });
  if (!("user_id" in parsedCookies)) {
    return res.redirect("/users/login");
  }
  User.findById(parsedCookies["user_id"], function (err, user) {
    if (err) {
      console.log("Error in creating user while signing up");
      return res.redirect("back");
    }
    if (!user) {
      return res.redirect("back");
    }
    return res.render("profile", {
      title: "Profile",
      user: { name: user.name, email: user.email },
    });
  });
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

module.exports.logout = function (req, res) {
  res.clearCookie("user_id");
  return res.redirect("/users/login");
};

module.exports.createSession = function (req, res) {
  console.log("createSession", req.body);
  email = req.body.email;
  password = req.body.password;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log("Error while getting the user");
      return res.redirect("back");
    }
    if (!user) {
      res.redirect("back");
    } else {
      if (user.password != password) {
        console.log("Password Mismatch");
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    }
  });
};
