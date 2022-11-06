const { pool } = require("../../database");
const createPost = async (data) => {
  const result = await pool.query(`INSERT INTO "Post" ("userId", title, detail) 
      VALUES ('${data.userId}','${data.title}','${data.detail}') RETURNING "id";`);
  return result;
};
const uploadImages = async (data) => {
  const result = await Promise.all(
    data.images.map(async (item) => {
      return await pool.query(
        `INSERT INTO "Post_image" (image_url,"postId") VALUES ('${item}','${data.postId}');`
      );
    })
  );
  return result;
};
module.exports = {
  createPost,
  uploadImages,
};
