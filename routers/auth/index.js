const express = require("express");
const { register, login } = require("../../controllers/auth");
const router = express.Router();
router.post("/register", (req) => {
  console.log(req);
});
router.post("/login", login);
module.exports = router;
