import express from "express";
import {
  signup,
  login,
  logout,
  getUserProfile,
  updateProfile,
} from "../controllers/userControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", checkAuth, logout);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateProfile);

export default router;
