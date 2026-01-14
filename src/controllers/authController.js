const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../Services/authservice");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN HIT", req.body);

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await authService.getUserByEmail(email);
    console.log("USER:", user);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const inputPassword = String(password).trim();
    console.log("Trimmed password:", inputPassword);
    console.log("DB Password:", user.password);

    const isMatch = await bcrypt.compare(inputPassword, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const rawPermissions = await authService.getUserPermissions(user.id);
    const permissions = rawPermissions.map(p => p.name || p);
    console.log("USER PERMISSIONS:", permissions);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
