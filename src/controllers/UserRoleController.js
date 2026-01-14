const service = require("../Services/UserRoleService");

exports.getUserRoles = async (req, res) => {
  const roles = await service.getUserRoles(req.params.id);
  res.json(roles);
};

exports.assignRoles = async (req, res) => {
  const { roles } = req.body;
  await service.assignRoles(req.params.id, roles);
  res.json({ message: "Roles assigned" });
};
