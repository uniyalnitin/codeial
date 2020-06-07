const Post = require("../models/post");

module.exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    Post.find({ user: req.user.id }, function (err, posts) {
      if (err) {
        console.log("Error while fetching the posts from database!");
        return;
      }
      return res.render("home", {
        title: "home",
        posts: posts,
      });
    });
  } else {
    return res.render("home", {
      title: "home",
    });
  }
};
