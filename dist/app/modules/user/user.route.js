"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const user_controllers_1 = require("./user.controllers");
const router = (0, express_1.Router)();
router.get("/", user_controllers_1.UserControllers.getAllUsers);
router.put("/update", multer_config_1.multerUpload.single("image"), user_controllers_1.UserControllers.updateProfile);
router.delete("/:userId", user_controllers_1.UserControllers.deleteUser);
router.get("/:email", user_controllers_1.UserControllers.getUserByEmail);
router.put("/block", user_controllers_1.UserControllers.blockUser);
router.put("/makeAdmin", user_controllers_1.UserControllers.makeAdmin);
router.put("/follow", user_controllers_1.UserControllers.follow);
exports.UserRoutes = router;