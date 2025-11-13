import Service from "../models/Service.js";

// CREATE (Admin Only)
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json({ message: "Service created", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL (Admin + Users)
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE (Admin + Users)
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (Admin Only)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Service updated", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (Admin Only)
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
