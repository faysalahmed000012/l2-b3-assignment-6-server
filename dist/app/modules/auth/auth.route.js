"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_zod_validation_1 = require("../user/user.zod.validation");
const auth_controllers_1 = require("./auth.controllers");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(user_zod_validation_1.UserZodSchema), auth_controllers_1.AuthControllers.registerUser);
router.post("/login", auth_controllers_1.AuthControllers.userLogin);
router.post("/forgot-password", auth_controllers_1.AuthControllers.forgotPassword);
router.post("/reset-password/:token", auth_controllers_1.AuthControllers.resetPassword);
router.get("/:email", auth_controllers_1.AuthControllers.getUserByEmail);
router.post("/refresh-token", auth_controllers_1.AuthControllers.refreshToken);
router.put("/change-password", auth_controllers_1.AuthControllers.changePassword);
exports.AuthRoutes = router;
