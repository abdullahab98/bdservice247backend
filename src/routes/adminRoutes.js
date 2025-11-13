import express from "express";
import { adminProtect } from "../middleware/adminMiddleware.js";
import { approveRecharge, approveUser } from "../controllers/adminController.js";

const router = express.Router();

router.patch("/recharge/approve/:id", adminProtect, approveRecharge);
router.patch("/user/approve/:id", adminProtect, approveUser);

export default router;
