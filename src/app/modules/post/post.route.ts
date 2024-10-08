import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { PostControllers } from "./post.controllers";

const router = Router();

router.post("/", multerUpload.single("image"), PostControllers.createPost);
router.get("/", PostControllers.getAllPosts);
router.get("/user/upvoted/:userId", PostControllers.getUserUpvoteddPosts);
router.get("/user/:userId", PostControllers.getPostByUser);
router.get("/:postId", PostControllers.getPostById);
router.put(
  "/update/:postId",
  multerUpload.single("image"),
  PostControllers.updatePost
);
router.put("/action/comment", PostControllers.comment);
router.put("/action/upVote", PostControllers.upVote);
router.put("/action/downVote", PostControllers.downVote);
router.put("/action/rating", PostControllers.addRating);
router.put("/approve/:id", PostControllers.approvePost);
router.delete("/:id", PostControllers.deletePost);

export const postRoutes = router;
