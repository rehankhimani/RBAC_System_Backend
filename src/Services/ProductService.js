const db = require("../config/db");

exports.getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT id, name, description, price, stock FROM products"
  );
  return rows;
};

exports.getProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, description, price, stock FROM products WHERE id=?",
    [id]
  );
  return rows[0]; 
};

exports.createProduct = async (data) => {
  const { name, description, price, stock } = data;
  const [result] = await db.query(
    "INSERT INTO products (name, description, price, stock) VALUES (?,?,?,?)",
    [name, description || null, price || 0, stock || 0]
  );
  return result.insertId;
};

exports.updateProduct = async (id, data) => {
  const { name, description, price, stock } = data;
  await db.query(
    "UPDATE products SET name=?, description=?, price=?, stock=? WHERE id=?",
    [name, description || null, price || 0, stock || 0, id]
  );
};

exports.deleteProduct = async (id) => {
  await db.query("DELETE FROM products WHERE id=?", [id]);
};
