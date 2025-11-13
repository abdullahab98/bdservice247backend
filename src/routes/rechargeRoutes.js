import express from "express";
import {
  createRecharge,
  getRecharges,
  getRecharge,
  updateRecharge,
  deleteRecharge
} from "../controllers/rechargeController.js";

const router = express.Router();

router.post("/", createRecharge);       // Create
router.get("/", getRecharges);          // Read all
router.get("/:id", getRecharge);        // Read one
router.patch("/:id", updateRecharge);   // Update
router.delete("/:id", deleteRecharge);  // Delete

export default router;
