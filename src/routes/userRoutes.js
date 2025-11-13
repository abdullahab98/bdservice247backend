import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);       // Create
router.get("/", getUsers);          // Read all
router.get("/:id", getUser);        // Read one
router.patch("/:id", updateUser);   // Update
router.delete("/:id", deleteUser);  // Delete

router.get("/profile", protect, getProfile);

export default router;
