const User = require("../models/user");

module.exports.userProfile = async function (req, res) {
  const user = await User.findById(req.params.id);
  return res.render("profile", {
    title: "profile",
    profileUser: user,
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("login", {
    title: "login",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signUp", {
    title: "signUp",
  });
};

module.exports.createUser = async function (req, res) {
  try {
    if (req.body.password != req.body.confirmPassword) {
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      user = await User.create(req.body);
      req.flash("success", "Account created successfully..");
      return res.redirect("/users/sign-in");
    } else {
      req.flash("success", "Email id already registered.");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    console.log("error in creating user while signing up");
    return res.redirect("back");
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Successfully signed in!");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "Successfully logged out!");
  req.logout();
  return res.redirect("/users/sign-in");
};

module.exports.update = async function (req, res) {
  try {
    if (req.params.id == req.user.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      (await user).save();
      req.flash("success", "Successfully Updated the details.");
      return res.redirect("/");
    } else {
      return res.status(403).send("Unauthorized!");
    }
  } catch (error) {
    req.flash("error", error);
    console.log("Error while updating the user!");
    return res.redirect("back");
  }
};
