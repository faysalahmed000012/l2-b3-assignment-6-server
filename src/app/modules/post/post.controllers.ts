import catchAsync from "../../utils/catchAsync";
import { PostServices } from "./post.services";

const createPost = catchAsync(async (req, res) => {
  const data = req.body;
  const newPost = await PostServices.createPost(data);

  res.status(201).json({
    status: "true",
    message: "Post created successfully",
    data: newPost,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await PostServices.getAllPosts(query);

  res.status(200).json({
    success: true,
    message: "All Posts Fetched Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await PostServices.updatePost(payload);

  res.status(200).json({
    success: true,
    message: "Post Updated Successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await PostServices.deletePost(id);

  res.status(200).json({
    success: true,
    message: "Post Deleted Successfully",
    data: result,
  });
});

const approvePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await PostServices.approvePost(id);

  res.status(200).json({
    success: true,
    message: "Post Approved Successfully",
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  approvePost,
};
