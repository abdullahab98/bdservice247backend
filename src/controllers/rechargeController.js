import Recharge from "../models/Recharge.js";

// CREATE
export const createRecharge = async (req, res) => {
  try {
    const recharge = await Recharge.create(req.body);
    res.json({ message: "Recharge created", recharge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getRecharges = async (req, res) => {
  try {
    const list = await Recharge.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE
export const getRecharge = async (req, res) => {
  try {
    const recharge = await Recharge.findById(req.params.id);
    if (!recharge) return res.status(404).json({ error: "Recharge not found" });

    res.json(recharge);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

    res.json({ message: "Recharge updated", recharge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteRecharge = async (req, res) => {
  try {
    await Recharge.findByIdAndDelete(req.params.id);
    res.json({ message: "Recharge deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
