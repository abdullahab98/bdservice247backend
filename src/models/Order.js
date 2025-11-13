import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },

  // User provides details based on service needs
  userInput: Object,

  price: Number,

  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },

  adminComment: { type: String, default: "" },

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
