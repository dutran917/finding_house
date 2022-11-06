const post = require("../../models/post");
const createPost = async (req, res) => {
  const { userId, title, detail } = req.body;
  try {
    const files = req.files;
    const p = await post.createPost({
      userId,
      title: title,
      detail: detail,
    });
    console.log(p.id, "postID");
    if (files) {
      const filepath = files.map((item) => {
        return `/uploads/${item.filename}`;
      });
      await post.uploadImages({ images: filepath, postId: p.id });
    }
    res.status(200).send({
      message: "Created post",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "something went wrong",
    });
  }
};
// const uploadImage = async();

module.exports = {
  createPost,
};
