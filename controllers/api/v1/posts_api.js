const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: { path: "user" },
      options: { sort: { createdAt: -1 } },
    });

  return res.status(200).json({
    message: "list of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (req.user.id == post.user) {
    post.remove();
    await Comment.deleteMany({ post: post.id });
    return res.status(200).json({
        message: "Post and associated comments deleted succesfully!"
    });
    }else{
        return res.status(403).json({
            message:"You are not authorized to delete this post"
        })
    } 
  } catch (error) {
      console.log(error)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
