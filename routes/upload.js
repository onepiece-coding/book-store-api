const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { imageUploaded } = require("../controllers/uploadController");

// The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
  // where the file should be stored.
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },

  // what the file should be named inside the folder.
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// /api/upload
router.post("/", upload.single("image"), imageUploaded);

module.exports = router;
