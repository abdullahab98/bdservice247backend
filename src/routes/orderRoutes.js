import express from "express";
import {
  createOrder,
  getUserOrders,
  cancelOrder,
  getUserOrdersByService
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);
router.get("/service/:serviceId", protect, getUserOrdersByService);
router.patch("/cancel/:id", protect, cancelOrder);

export default router;
