import { Router } from "express";
import { PostControllers } from "./post.controllers";

const router = Router();

router.post("/", PostControllers.createPost);
router.get("/", PostControllers.getAllPosts);
router.put("/update", PostControllers.updatePost);
router.put("/approve/:id", PostControllers.approvePost);
router.delete("/:id", PostControllers.deletePost);

export const postRoutes = router;
