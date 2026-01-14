const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/PermissionMiddleware");

router.get("/", authMiddleware, permissionMiddleware("permission.view"), permissionController.getPermissions);

router.post("/create", authMiddleware, permissionMiddleware("permission.create"), permissionController.createPermission);

router.put("/:id", authMiddleware, permissionMiddleware("permission.update"), permissionController.updatePermission);

router.delete("/:id", authMiddleware, permissionMiddleware("permission.delete"), permissionController.deletePermission);
router.get( "/:id",authMiddleware,permissionMiddleware("permission.view"),permissionController.getPermissionById);
module.exports = router;
