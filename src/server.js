import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { responseHandler } from "./middleware/responseHandler.js"; 

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rechargeRoutes from "./routes/rechargeRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

app.use(responseHandler);

// Health Check Endpoint (Updated)
app.get("/api/health", (req, res) => {
  const data = {
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  };
  res.apiSuccess(data, "Health check successful");
});

// POST health endpoint (Updated)
app.post("/api/health", (req, res) => {
   const data = {
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  };
  res.apiSuccess(data, "Health check successful");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recharge", rechargeRoutes);

app.use("/api/admin/auth", adminAuthRoutes);  
app.use("/api/admin", adminRoutes); 

app.use("/api/services", serviceRoutes);   

app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/logout", logoutRoutes);


export default app;