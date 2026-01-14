const router = require("express").Router();
const PC = require("../controllers/ProductController");
const auth = require("../middlewares/authMiddleware");
const perm = require("../middlewares/PermissionMiddleware");

router.get("/", auth, perm("product.view"), PC.getProducts);
router.get("/:id", auth, perm("product.view"), PC.getProductById);
router.post("/", auth, perm("product.create"), PC.createProduct);
router.put("/:id", auth, perm("product.edit"), PC.updateProduct);
router.delete("/:id", auth, perm("product.delete"), PC.deleteProduct);

module.exports = router;
