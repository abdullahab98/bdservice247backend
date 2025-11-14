import Recharge from "../models/Recharge.js";

// CREATE
export const createRecharge = async (req, res) => {
  try {
    const recharge = await Recharge.create(req.body);
    res.apiSuccess(recharge, "Recharge created", 201);
  } catch (err) {
    res.apiError(err, "Failed to create recharge", 500);
  }
};

// GET ALL
export const getRecharges = async (req, res) => {
  try {
    const list = await Recharge.find();
    res.apiSuccess(list, "Recharges retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get recharges", 500);
  }
};

// GET SINGLE
export const getRecharge = async (req, res) => {
  try {
    const recharge = await Recharge.findById(req.params.id);
    if (!recharge) {
      return res.apiError("Recharge not found", "Recharge not found", 404);
    }

    res.apiSuccess(recharge, "Recharge retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get recharge", 500);
  }
};

// UPDATE
export const updateRecharge = async (req, res) => {
  try {
    const recharge = await Recharge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.apiSuccess(recharge, "Recharge updated");
  } catch (err) {
    res.apiError(err, "Failed to update recharge", 500);
  }
};

// DELETE
export const deleteRecharge = async (req, res) => {
  try {
    await Recharge.findByIdAndDelete(req.params.id);
    res.apiSuccess(null, "Recharge deleted");
  } catch (err) {
    res.apiError(err, "Failed to delete recharge", 500);
  }
};