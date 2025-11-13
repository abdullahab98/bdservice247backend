import Order from "../models/Order.js";
import User from "../models/User.js";
import Service from "../models/Service.js";

// USER CREATES ORDER
export const createOrder = async (req, res) => {
  try {
    const { service_id, userInput } = req.body;
    const userId = req.user.id;

    const service = await Service.findById(service_id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const user = await User.findById(userId);
    if (user.balance < service.price)
      return res.status(400).json({ error: "Not enough balance" });

    // Deduct balance
    user.balance -= service.price;
    await user.save();

    const order = await Order.create({
      user_id: userId,
      service_id,
      userInput,
      price: service.price,
    });

    res.json({ message: "Order placed", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER ORDER HISTORY
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id }).populate("service_id");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER ORDER HISTORY FILTER BY SERVICE
export const getUserOrdersByService = async (req, res) => {
  try {
    const orders = await Order.find({
      user_id: req.user.id,
      service_id: req.params.serviceId,
    });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER CANCEL ORDER
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.status !== "pending")
      return res.status(400).json({ error: "Only pending orders can be cancelled" });

    // Refund
    const user = await User.findById(order.user_id);
    user.balance += order.price;
    await user.save();

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled & amount refunded", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
