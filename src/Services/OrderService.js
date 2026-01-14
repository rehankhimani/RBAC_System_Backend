const db = require("../config/db");

exports.getAllOrders = async () => {
  const [rows] = await db.query(
    "SELECT o.id, o.user_id, o.total_amount, o.status, o.created_at, o.updated_at, u.name AS user_name FROM orders o LEFT JOIN users u ON o.user_id=u.id"
  );
  return rows;
};

exports.getOrderById = async (id) => {
  const [rows] = await db.query(
    "SELECT o.id, o.user_id, o.total_amount, o.status, o.created_at, o.updated_at, u.name AS user_name FROM orders o LEFT JOIN users u ON o.user_id=u.id WHERE o.id=?",
    [id]
  );
  if (!rows.length) return null;

  // fetch order items
  const [items] = await db.query(
    "SELECT oi.id, oi.product_id, p.name AS product_name, oi.quantity, oi.price FROM order_items oi LEFT JOIN products p ON oi.product_id=p.id WHERE oi.order_id=?",
    [id]
  );

  return { ...rows[0], items };
};

exports.createOrder = async (user_id, status, items) => {
  const [result] = await db.query(
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)",
    [user_id, items.reduce((sum, i) => sum + i.quantity * i.price, 0), status]
  );
  const order_id = result.insertId;

  for(const item of items){
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [order_id, item.product_id, item.quantity, item.price]
    );
  }

  return order_id;
};


exports.updateOrder = async (id, status, items) => {
  const total_amount = items.reduce((acc, i) => acc + i.quantity * i.price, 0);

  await db.query(
    "UPDATE orders SET total_amount=?, status=?, updated_at=? WHERE id=?",
    [total_amount, status, new Date(), id]
  );

  await db.query("DELETE FROM order_items WHERE order_id=?", [id]);

  for (const item of items) {
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
      [id, item.product_id, item.quantity, item.price]
    );
  }
};

exports.deleteOrder = async (id) => {
  await db.query("DELETE FROM order_items WHERE order_id=?", [id]);
  await db.query("DELETE FROM orders WHERE id=?", [id]);
};
