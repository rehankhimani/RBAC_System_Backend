const userService = require("../Services/userservice");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userService.createUser({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created",
      userId
    });

  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    let updateData = { name, email };

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    await userService.updateUser(id, updateData);

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
