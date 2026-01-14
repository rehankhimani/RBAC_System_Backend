const db = require("../config/db");

exports.getUserRoles = async (userId) => {
  const [rows] = await db.query(
    `SELECT r.id, r.name
     FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ?`,
    [userId]
  );
  return rows;
};

exports.assignRoles = async (userId, roles) => {
  await db.query("DELETE FROM user_roles WHERE user_id=?", [userId]);

  if (!roles || roles.length === 0) return;

  const values = roles.map(rid => [userId, rid]);
  await db.query(
    "INSERT INTO user_roles (user_id, role_id) VALUES ?",
    [values]
  );
};
