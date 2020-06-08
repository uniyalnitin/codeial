const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      contents: req.body.content,
      user: req.user.id,
    });
    return res.redirect("back");
  } catch (error) {
    console.log("Error white creating the post!");
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (req.user.id == post.user) {
      post.remove();
      Comment.deleteMany({ post: post.id });
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error white deleting the post!");
    return;
  }
};
