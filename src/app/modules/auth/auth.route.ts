import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserZodSchema } from "../user/user.zod.validation";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post(
  "/register",
  validateRequest(UserZodSchema),
  AuthControllers.registerUser
);
router.post("/login", AuthControllers.userLogin);
router.post("/forgot-password", AuthControllers.forgotPassword);
router.post("/reset-password/:token", AuthControllers.resetPassword);
router.get("/:email", AuthControllers.getUserByEmail);
router.post("/refresh-token", AuthControllers.refreshToken);
router.put("/change-password", AuthControllers.changePassword);

export const AuthRoutes = router;
