const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      contents: req.body.content,
      user: req.user.id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: { post: post },
        message: "Post created Successfully!",
      });
    }
    req.flash("success", "Successfully posted!");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
    console.log("Error white creating the post!");
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (req.user.id == post.user) {
      post.remove();
      Comment.deleteMany({ post: post.id });
      if (req.xhr) {
        return res.status(200).json({
          data: { post_id: req.params.id },
          message: "Post deleted",
        });
      }
      req.flash("success", "Post deleted successfully!!");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    console.log("Error white deleting the post!");
    return res.redirect("back");
  }
};
