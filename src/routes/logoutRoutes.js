import express from "express";
import { logout } from "../controllers/logoutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, logout);

export default router;
