import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
  adminCancelOrder,
  deleteOrder
} from "../controllers/adminOrderController.js";

import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", adminProtect, getAllOrders);
router.patch("/:id", adminProtect, updateOrderStatus);
router.patch("/cancel/:id", adminProtect, adminCancelOrder);
router.delete("/:id", adminProtect, deleteOrder);

export default router;
