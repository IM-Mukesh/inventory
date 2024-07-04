// // routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// const upload = multer({
//   storage,
//   limits: { fileSize: 1000000 }, // 1MB
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = fileTypes.test(file.mimetype);
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb("Images only!");
//     }
//   },
// });

// router.post("/", upload.single("partPhoto"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

// module.exports = router;

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const User = require("../models/userModel");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

exports.setProfilePic = (req, res, next) => {
  console.log("hello bro");
  // const uploadSingle = upload("mukesh-inventory").single("croppedImage");
  // uploadSingle(req, res, async (err) => {
  //   if (err)
  //     return res.status(400).json({ success: false, message: err.message });
  //   await User.create({ photoUrl: req.file.location });
  //   res.status(200).json({ data: req.file.location });
  // });
  res.status(200).json({ data: "xx" });
};
