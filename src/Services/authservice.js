const db = require("../config/db");

exports.getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  } catch (error) {
    console.error("getUserByEmail error:", error);
    throw error;
  }
};

exports.getUserPermissions = async (userId) => {
  const [rows] = await db.query(`
    SELECT DISTINCT p.name
    FROM permissions p
    JOIN role_permissions rp ON rp.permission_id = p.id
    JOIN user_roles ur ON ur.role_id = rp.role_id
    WHERE ur.user_id = ?
  `, [userId]);

  return rows.map(r => r.name);
};
