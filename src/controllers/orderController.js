import Order from "../models/Order.js";
import User from "../models/User.js";
import Service from "../models/Service.js";

// USER CREATES ORDER
export const createOrder = async (req, res) => {
  try {
    const { service_id, userInput } = req.body;
    const userId = req.user.id;

    const service = await Service.findById(service_id);
    if (!service) {
      return res.apiError("Service not found", "Service not found", 404);
    }

    const user = await User.findById(userId);
    if (user.balance < service.price) {
      return res.apiError("Not enough balance", "Not enough balance", 400);
    }

    // Deduct balance
    user.balance -= service.price;
    await user.save();

    const order = await Order.create({
      user_id: userId,
      service_id,
      userInput,
      price: service.price,
    });

    res.apiSuccess(order, "Order placed", 201);

  } catch (err) {
    res.apiError(err, "Failed to place order", 500);
  }
};

// USER ORDER HISTORY
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id }).populate("service_id");
    res.apiSuccess(orders, "User orders retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get user orders", 500);
  }
};

// USER ORDER HISTORY FILTER BY SERVICE
export const getUserOrdersByService = async (req, res) => {
  try {
    const orders = await Order.find({
      user_id: req.user.id,
      service_id: req.params.serviceId,
    });

    res.apiSuccess(orders, "User orders for service retrieved");

  } catch (err) {
    res.apiError(err, "Failed to get user orders by service", 500);
  }
};

// USER CANCEL ORDER
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!order) {
      return res.apiError("Order not found", "Order not found", 404);
    }

    if (order.status !== "pending") {
      return res.apiError("Only pending orders can be cancelled", "Only pending orders can be cancelled", 400);
    }

    // Refund
    const user = await User.findById(order.user_id);
    user.balance += order.price;
    await user.save();

    order.status = "cancelled";
    await order.save();

    res.apiSuccess(order, "Order cancelled & amount refunded");

  } catch (err) {
    res.apiError(err, "Failed to cancel order", 500);
  }
};