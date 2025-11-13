import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  phone: String,
  password: String,
  transaction_id: String,
  image: { type: String, default: null },
  balance: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "success"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
