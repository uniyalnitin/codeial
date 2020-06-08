const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    const users = await User.find({});
    return res.render("home", {
      title: "Home",
      posts: posts,
      users: users,
    });
  } catch (error) {
    console.log("Error:", error);
    return;
  }
};
