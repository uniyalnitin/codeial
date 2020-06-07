const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post_id.trim(), function (err, post) {
    if (err) {
      console.log("Error while finding the post");
      return;
    }
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          user: req.user._id,
          post: post._id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error while creating the comment");
            return;
          }
          if (comment) {
            post.comments.push(comment._id);
            post.save(); // Important while updating the data
          }
          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      const postId = comment.post;
      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      console.log("Unauthorised to delete the comment");
      return res.redirect("back");
    }
  });
};
