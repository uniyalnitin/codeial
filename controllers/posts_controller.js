const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      contents: req.body.content,
      user: req.user.id,
    },
    function (err, post) {
      if (err) {
        console.log("Error while creating post");
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (req.user.id == post.user) {
      post.remove();
      Comment.deleteMany({ post: post.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
