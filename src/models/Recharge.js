import mongoose from "mongoose";

const rechargeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payment_method: String,
  phone: String,
  amount: Number,
  transaction_id: String,
  status: { type: String, enum: ["pending", "success", "reject"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Recharge", rechargeSchema);
