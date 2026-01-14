const permissionService = require("../Services/permissionservice");

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching permissions" });
  }
};
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await permissionService.getPermissionById(id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.json(permission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching permission" });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    await permissionService.createPermission(name);
    res.status(201).json({ message: "Permission created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating permission" });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await permissionService.updatePermission(id, name);
    res.json({ message: "Permission updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating permission" });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    await permissionService.deletePermission(id);
    res.json({ message: "Permission deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting permission" });
  }
};
