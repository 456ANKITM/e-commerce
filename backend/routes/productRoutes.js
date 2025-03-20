import express from "express";
import {
  addProducts,
  addReview,
  deleteProducts,
  getProductById,
  getProducts,
  updateProducts,
} from "../controllers/productControllers.js";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", checkAuth, checkAdmin, addProducts);
router.put("/:id", checkAuth, checkAdmin, updateProducts);
router.delete("/:id", deleteProducts);
router.put("/:id/addreview", checkAuth, addReview);

export default router;
