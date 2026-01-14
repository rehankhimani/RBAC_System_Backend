const db = require("../config/db");

exports.getAllPermissions = async () => {
  const [rows] = await db.query("SELECT * FROM permissions");
  return rows;
};
exports.getPermissionById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name FROM permissions WHERE id = ?",
    [id]
  );
  return rows[0]; 
};

exports.createPermission = async (name) => {
  await db.query("INSERT INTO permissions (name) VALUES (?)", [name]);
};

exports.updatePermission = async (id, name) => {
  await db.query("UPDATE permissions SET name=? WHERE id=?", [name, id]);
};

exports.deletePermission = async (id) => {
  await db.query("DELETE FROM permissions WHERE id=?", [id]);
};
