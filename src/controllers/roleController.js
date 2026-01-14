const roleService = require("../Services/roleservice");

exports.getRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching roles" });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Role name is required" });
    }

    await roleService.createRole(name);
    res.status(201).json({ message: "Role created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating role" });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await roleService.updateRole(id, name);
    res.json({ message: "Role updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating role" });
  }
};
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await roleService.getRoleById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const permissions = await roleService.getRolePermissions(id);

    res.json({ role, permissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching role" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await roleService.deleteRole(id);

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting role" });
  }
};

exports.assignPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    await roleService.assignPermissions(id, permissions);

    res.json({ message: "Permissions assigned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error assigning permissions" });
  }
};
