const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post_id.trim());

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: post._id,
      });

      if (comment) {
        post.comments.push(comment._id);
        post.save(); // Important while updating the data
      }
      req.flash("success", "Comment added..");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    console.log("Error", error);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      const postId = comment.post;
      comment.remove();

      const post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "Comment deleted successfully");
      return res.redirect("back");
    } else {
      console.log("Unauthorised to delete the comment");
      return res.status(403).send("UnAuthorized access");
    }
  } catch (error) {
    req.flash("error", error);
    console.log("Error:", error);
    return res.redirect("back");
  }
};
