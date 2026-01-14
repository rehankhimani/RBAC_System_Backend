const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/PermissionMiddleware");

router.get("/",authMiddleware,  roleController.getRoles);
router.post(  "/create",authMiddleware, permissionMiddleware("role.create"), roleController.createRole);

router.put( "/:id",authMiddleware, permissionMiddleware("role.edit"),roleController.updateRole);

router.delete( "/:id",authMiddleware,permissionMiddleware("role.delete"),roleController.deleteRole);

router.post("/:id/permissions",authMiddleware,permissionMiddleware("role.assign"),roleController.assignPermissions);
router.get("/:id",authMiddleware, permissionMiddleware("role.view"),roleController.getRoleById);

module.exports = router;
