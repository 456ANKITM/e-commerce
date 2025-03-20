import express from "express"
import { addOrder, confirmPayment, getEsewaFormData, getMyOrders, getOrderById, getOrders,updateDeliveryStatus } from "../controllers/orderControllers.js";
import checkAuth from "../middleware/checkAuth.js"
import checkAdmin from "../middleware/checkAdmin.js";

const router = express.Router();

router.post("/", checkAuth, addOrder)
router.get("/", checkAuth, checkAdmin, getOrders)
router.get("/confirm-payment", confirmPayment);
router.get("/order/:id", checkAuth, getOrderById)
router.get("/order/pay/:id", checkAuth, getEsewaFormData)
router.get("/myorders", checkAuth, getMyOrders)
router.put("/:id/deliver", checkAuth, checkAdmin, updateDeliveryStatus)

export default router;