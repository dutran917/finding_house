const upload = require("../../storage");
const express = require("express");
const { createPost } = require("../../controllers/post");
const router = express.Router();
router.post("/", upload.array("image_post", 3), createPost);
module.exports = router;
