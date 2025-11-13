import express from "express";
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public (Admin + User)
router.get("/", getServices);
router.get("/:id", getService);

// Admin Only
router.post("/", adminProtect, createService);
router.patch("/:id", adminProtect, updateService);
router.delete("/:id", adminProtect, deleteService);

export default router;
