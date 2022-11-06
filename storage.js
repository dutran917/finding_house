const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage,
});

module.exports = upload;
