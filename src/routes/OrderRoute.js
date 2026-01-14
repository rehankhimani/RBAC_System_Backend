const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/PermissionMiddleware");

router.get("/", authMiddleware, permissionMiddleware("order.view"),orderController.getOrders);
router.get("/:id", authMiddleware, permissionMiddleware("order.view"),orderController.getOrder);
router.post("/", authMiddleware,permissionMiddleware("order.create"), orderController.createOrder);
router.put("/:id", authMiddleware,permissionMiddleware("order.edit") ,orderController.updateOrder);
router.delete("/:id", authMiddleware,permissionMiddleware("order.delete"), orderController.deleteOrder);

module.exports = router;
