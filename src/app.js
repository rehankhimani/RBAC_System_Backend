const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes")); 
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/permissions", require("./routes/PermissionRoute"));
app.use("/api/user_roles", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/ProductRoute"));
app.use("/api/orders", require("./routes/OrderRoute"));


app.get("/", (req, res) => {
  res.send("RBAC Backend Running");
});

module.exports = app;
