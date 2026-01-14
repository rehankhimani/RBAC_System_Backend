const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userRoleController = require("../controllers/UserRoleController");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/PermissionMiddleware");

router.get("/", authMiddleware, permissionMiddleware("user.view"), userController.getUsers);
router.post("/create", authMiddleware, permissionMiddleware("user.create"), userController.createUser);
router.put("/:id/edit", authMiddleware, permissionMiddleware("user.edit"), userController.updateUser);
router.delete("/:id", authMiddleware, permissionMiddleware("user.delete"), userController.deleteUser);
router.get("/:id",authMiddleware,permissionMiddleware("user.view"), userController.getUserById);
router.get("/:id/roles",authMiddleware,permissionMiddleware("user.role.view"),userRoleController.getUserRoles);
router.post("/:id/roles",authMiddleware,permissionMiddleware("user.role.assign"),userRoleController.assignRoles);
module.exports = router;
