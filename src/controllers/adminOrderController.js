import Order from "../models/Order.js";
import User from "../models/User.js";

// ADMIN GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "name email")
      .populate("service_id");

    res.apiSuccess(orders, "All orders retrieved");
  } catch (err) {
    res.apiError(err, "Failed to get orders", 500);
  }
};

// ADMIN UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.apiError("Order not found", "Order not found", 404);
    }

    order.status = status;
    if (adminComment) order.adminComment = adminComment;

    await order.save();

    res.apiSuccess(order, "Order updated");

  } catch (err) {
    res.apiError(err, "Failed to update order", 500);
  }
};

// ADMIN CANCEL ORDER
export const adminCancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.apiError("Order not found", "Order not found", 404);
    }

    if (order.status === "cancelled") {
      return res.apiSuccess(order, "Order already cancelled");
    }

    // Refund to user
    const user = await User.findById(order.user_id);
    user.balance += order.price;
    await user.save();

    order.status = "cancelled";
    await order.save();

    res.apiSuccess(order, "Order cancelled by admin & refunded");

  } catch (err) {
    res.apiError(err, "Failed to cancel order", 500);
  }
};

// ADMIN DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.apiSuccess(null, "Order deleted by admin");
  } catch (err) {
    res.apiError(err, "Failed to delete order", 500);
  }
};