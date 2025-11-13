import Order from "../models/Order.js";
import User from "../models/User.js";

// ADMIN GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "name email")
      .populate("service_id");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    if (adminComment) order.adminComment = adminComment;

    await order.save();

    res.json({ message: "Order updated", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN CANCEL ORDER
export const adminCancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.status === "cancelled")
      return res.json({ message: "Order already cancelled" });

    // Refund to user
    const user = await User.findById(order.user_id);
    user.balance += order.price;
    await user.save();

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled by admin & refunded", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted by admin" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
