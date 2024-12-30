import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const updateProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateProfile({
    ...JSON.parse(req.body.data),
    profilePicture: req?.file?.path,
  });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  res.status(200).json({
    success: true,
    message: "All Users Retrieved Successfully",
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await UserServices.getUserByEmail(email);

  res.status(200).json({
    success: true,
    message: "User Retrieved Successfully",
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { email, block } = req.body;
  let result;
  if (block) {
    result = await UserServices.blockUser(email);
  } else {
    result = await UserServices.unblockUser(email);
  }

  res.status(200).json({
    success: true,
    message: "User Blocked Successfully",
    data: result,
  });
});

const makeAdmin = catchAsync(async (req, res) => {
  const { email, role } = req.body;
  let result;
  if (role == "admin") {
    result = await UserServices.makeAdmin(email);
  } else {
    result = await UserServices.removeFromAdmin(email);
  }

  res.status(200).json({
    success: true,
    message: "User Role Changed to Admin Successfully",
    data: result,
  });
});

const savePost = catchAsync(async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const action = req.body.action;
  const result = await UserServices.savePost(userId, postId, action);

  res.status(200).json({
    success: true,
    message: "Post Saved Successfully",
    data: result,
  });
});

const follow = catchAsync(async (req, res) => {
  const user = req.body.follower;
  const following = req.body.following;
  const type = req.body.type;
  if (user === following) {
    throw new AppError(403, "You  cannot follow yourself");
  }
  let result;
  if (type == "follow") {
    result = await UserServices.follow(user, following);
  } else if (type == "unfollow") {
    result = await UserServices.unFollow(user, following);
  }

  res.status(200).json({
    success: true,
    message: "Following Successfully",
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await UserServices.deleteUser(userId);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
    data: result,
  });
});

const getFollowersAndFollowing = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await UserServices.getFollowersAndFollowing(userId);

  res.status(200).json({
    success: true,
    message: "User Followers and Following Retrieved Successfully",
    data: result,
  });
});

export const UserControllers = {
  updateProfile,
  getAllUsers,
  getUserByEmail,
  blockUser,
  makeAdmin,
  follow,
  deleteUser,
  savePost,
  getFollowersAndFollowing,
};
