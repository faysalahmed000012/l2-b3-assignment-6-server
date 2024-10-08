import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { UserControllers } from "./user.controllers";

const router = Router();

router.get("/", UserControllers.getAllUsers);
router.put(
  "/update",
  multerUpload.single("image"),
  UserControllers.updateProfile
);
router.delete("/:userId", UserControllers.deleteUser);
router.get("/:email", UserControllers.getUserByEmail);
router.put("/block", UserControllers.blockUser);
router.put("/makeAdmin", UserControllers.makeAdmin);
router.put("/follow", UserControllers.follow);

export const UserRoutes = router;
