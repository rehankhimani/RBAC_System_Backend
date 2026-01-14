const db = require("./config/db.js");

async function test() {
  try {
    const [rows] = await db.query("SHOW DATABASES");
    console.log("DB connected! Databases:", rows);
  } catch (err) {
    console.error("DB Error:", err);
  }
}

test();
