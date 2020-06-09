const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    const users = await User.find({});
    return res.render("home", {
      title: "Home",
      posts: posts,
      users: users,
    });
  } catch (error) {
    req.flash("error", error);
    console.log("Error:", error);
    return res.redirect("back");
  }
};
