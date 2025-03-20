import multer from "multer";
import express from "express";
import ApiError from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let fn = Date.now() + file.originalname;
    cb(null, fn);
  },
});

const fileFilter = (req, file, cb) => {
  const imagePattern = /\.(jpg|jpeg|png)$/;
  const isMatch = file.originalname.match(imagePattern);
  if (isMatch) cb(null, true);
  else cb(new ApiError(404, "only Image file!"), false);
};

const upload = multer({
  storage,
  fileFilter,
});

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  console.log("This is running");
  res.send({
    message: "file uploades sucessfully",
    path: `/${req.file.path}`,
  });
});

export default router;
