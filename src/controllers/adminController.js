import Recharge from "../models/Recharge.js";
import User from "../models/User.js";


// Approve Recharge
export const approveRecharge = async (req, res) => {
  try {
    const { id } = req.params;

    const recharge = await Recharge.findById(id);
    if (!recharge) {
      return res.status(404).json({ error: "Recharge not found" });
    }

    // Update status
    recharge.status = "success";
    await recharge.save();

    // Add balance to user
    await User.findByIdAndUpdate(recharge.user_id, {
      $inc: { balance: recharge.amount },
    });

    res.json({ message: "Recharge approved and balance updated!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Approve User Registration
export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.status = "success";
    await user.save();

    res.json({ message: "User approved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
