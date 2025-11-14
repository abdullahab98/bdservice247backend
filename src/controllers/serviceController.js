import Service from "../models/Service.js";

// CREATE (Admin Only)
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.apiSuccess(service, "Service created", 201);
  } catch (err) {
    res.apiError(err, "Failed to create service", 500);
  }
};

// GET ALL (Admin + Users)
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.apiSuccess(services, "Services retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get services", 500);
  }
};

// GET SINGLE (Admin + Users)
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.apiError("Service not found", "Service not found", 404);
    }
    res.apiSuccess(service, "Service retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get service", 500);
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

    res.apiSuccess(service, "Service updated");
  } catch (err) {
    res.apiError(err, "Failed to update service", 500);
  }
};

// DELETE (Admin Only)
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.apiSuccess(null, "Service deleted");
  } catch (err) {
    res.apiError(err, "Failed to delete service", 500);
  }
};