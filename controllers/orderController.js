const Order = require("../models/Order");
const Part = require("../models/Part");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { type, parts, status } = req.body;

    for (const partItem of parts) {
      const part = await Part.findById(partItem.partId);
      if (!part) {
        return res.status(404).json({ message: "Part not found" });
      }

      if (type === "purchase") {
        part.quantity += partItem.quantity;
        part.serialNumbers.push(...partItem.serialNumbers);
      } else if (type === "sales") {
        part.quantity -= partItem.quantity;
        part.serialNumbers = part.serialNumbers.filter(
          (sn) => !partItem.serialNumbers.includes(sn)
        );
      }

      await part.save();
    }

    const order = new Order({
      type,
      parts,
      status,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("parts.partId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("parts.partId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { type, parts, status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.type = type;
    order.parts = parts;
    order.status = status;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
