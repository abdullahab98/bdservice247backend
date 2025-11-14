import Recharge from "../models/Recharge.js";
import User from "../models/User.js";

// Approve Recharge
export const approveRecharge = async (req, res) => {
  try {
    const { id } = req.params;

    const recharge = await Recharge.findById(id);
    if (!recharge) {
      return res.apiError("Recharge not found", "Recharge not found", 404);
    }

    // Update status
    recharge.status = "success";
    await recharge.save();

    // Add balance to user
    await User.findByIdAndUpdate(recharge.user_id, {
      $inc: { balance: recharge.amount },
    });

    res.apiSuccess(null, "Recharge approved and balance updated!");
  } catch (err) {
    res.apiError(err, "Failed to approve recharge", 500);
  }
};


// Approve User Registration
export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.apiError("User not found", "User not found", 404);
    }

    user.status = "success";
    await user.save();

    res.apiSuccess(null, "User approved successfully!");
  } catch (err) {
    res.apiError(err, "Failed to approve user", 500);
  }
};