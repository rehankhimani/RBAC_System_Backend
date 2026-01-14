const db = require("../config/db");

exports.getAllUsers = async () => {
  const [rows] = await db.query(
    "SELECT id, name, email FROM users"
  );
  return rows;
};

exports.createUser = async (user) => {
  const { name, email, password } = user;

  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  return result.insertId;
};
exports.getUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [id]
  );
  return rows[0]; 
};

exports.updateUser = async (id, user) => {
  const { name, email, password } = user;

  if (password) {
    await db.query(
      "UPDATE users SET name=?, email=?, password=? WHERE id=?",
      [name, email, password, id]
    );
  } else {
    await db.query(
      "UPDATE users SET name=?, email=? WHERE id=?",
      [name, email, id]
    );
  }
};

exports.deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id=?", [id]);
};
