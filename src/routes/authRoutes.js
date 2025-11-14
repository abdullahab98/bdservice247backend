import express from "express";
import { register, login, checkTokenStatus } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-status", checkTokenStatus);

export default router;
