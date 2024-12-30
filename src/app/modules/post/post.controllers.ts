import catchAsync from "../../utils/catchAsync";
import { PostServices } from "./post.services";

const createPost = catchAsync(async (req, res) => {
  const newPost = await PostServices.createPost({
    ...JSON.parse(req.body.data),
    image: req?.file?.path,
  });

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

const getPostById = catchAsync(async (req, res) => {
  const postId = req.params.postId;

  const post = await PostServices.getPostById(postId);

  res.status(200).json({
    success: true,
    message: "Post Fetched Successfully",
    data: post,
  });
});

const getPostByUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const post = await PostServices.getPostByUser(userId);

  res.status(200).json({
    success: true,
    message: "Posts Fetched Successfully",
    data: post,
  });
});

const getUserLikedPosts = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const post = await PostServices.getUserLikedPosts(userId);

  res.status(200).json({
    success: true,
    message: "Posts Fetched Successfully",
    data: post,
  });
});

const getAllLikes = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const posts = await PostServices.getAllLikes(userId);

  res.status(200).json({
    success: true,
    message: "All Posts Fetched Successfully",
    data: posts,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const postId = req.params.postId;

  const result = await PostServices.updatePost(
    {
      ...JSON.parse(req.body.data),
      image: req?.file?.path,
    },
    postId
  );

  res.status(200).json({
    success: true,
    message: "Post Updated Successfully",
    data: result,
  });
});

const comment = catchAsync(async (req, res) => {
  const { postId, comment, mode } = req.body;
  let result;
  if (mode == "create") {
    result = await PostServices.comment(postId, comment);
  } else if (mode == "update") {
    result = await PostServices.editComment(postId, comment);
  } else if (mode == "delete") {
    result = await PostServices.deleteComment(postId, comment);
  }

  res.status(200).json({
    success: true,
    message: "Comment Added Successfully",
    data: result,
  });
});

const upVote = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;
  const result = await PostServices.manageVote(postId, userId, "upVote");

  res.status(200).json({
    success: true,
    message: "You Upvoted This Post",
    data: result,
  });
});

const downVote = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;

  const result = await PostServices.manageVote(postId, userId, "downVote");

  res.status(200).json({
    success: true,
    message: "You Downvoted This Post",
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

const addRating = catchAsync(async (req, res) => {
  const { postId, userId, rating } = req.body;

  const result = await PostServices.addRating(postId, userId, rating);

  res.status(200).json({
    success: true,
    message: "You Rated This Post",
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  approvePost,
  comment,
  upVote,
  downVote,
  addRating,
  getPostById,
  getPostByUser,
  getUserLikedPosts,
  getAllLikes,
};
