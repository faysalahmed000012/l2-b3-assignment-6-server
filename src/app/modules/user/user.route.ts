import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router = Router();

router.put("/update", UserControllers.updateProfile);

export const UserRoutes = router;
