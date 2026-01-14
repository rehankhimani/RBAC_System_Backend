const db = require("../config/db");

exports.getAllRoles = async () => {
  const [rows] = await db.query("SELECT id, name FROM roles");
  return rows;
};

exports.createRole = async (name) => {
  const [result] = await db.query("INSERT INTO roles (name) VALUES (?)", [name]);
  return result.insertId;
};

exports.updateRole = async (id, name) => {
  await db.query("UPDATE roles SET name=? WHERE id=?", [name, id]);
};

exports.deleteRole = async (id) => {
  await db.query("DELETE FROM role_permissions WHERE role_id=?", [id]);
  await db.query("DELETE FROM roles WHERE id=?", [id]);
};

exports.getRoleById = async (id) => {
  const [rows] = await db.query("SELECT id, name FROM roles WHERE id=?", [id]);
  return rows[0]; 
};

exports.getRolePermissions = async (roleId) => {
  const [rows] = await db.query(
    `SELECT p.id, p.name 
     FROM permissions p
     JOIN role_permissions rp ON p.id = rp.permission_id
     WHERE rp.role_id = ?`,
    [roleId]
  );
  return rows; 
};

exports.assignPermissions = async (roleId, permissions) => {
  await db.query("DELETE FROM role_permissions WHERE role_id=?", [roleId]);

  if (!permissions || permissions.length === 0) return;

  const values = permissions.map(pid => [roleId, pid]);
  await db.query("INSERT INTO role_permissions (role_id, permission_id) VALUES ?", [values]);
};
