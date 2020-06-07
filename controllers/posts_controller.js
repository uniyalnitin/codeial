const Post = require("../models/post");

module.exports.createPost = function (req, res) {
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
