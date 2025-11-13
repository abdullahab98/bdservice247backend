import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  duration: { type: String, required: true } // like "30 mins", "1 month" etc.
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
