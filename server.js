require("dotenv").config();
const app = require("../Backend/src/app");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
