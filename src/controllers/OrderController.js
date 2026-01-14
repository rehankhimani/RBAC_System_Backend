const orderService = require("../Services/OrderService");

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status, items } = req.body;
    const order_id = await orderService.createOrder(user_id, status, items);
    res.status(201).json({ order_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status, items } = req.body;
    await orderService.updateOrder(req.params.id, status, items);
    res.json({ message: "Order updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
