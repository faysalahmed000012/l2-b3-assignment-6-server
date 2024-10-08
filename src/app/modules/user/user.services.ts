import AppError from "../../errors/AppError";
import { IUser } from "./user.interfaces";
import { User } from "./user.model";

const updateProfile = async (payload: Partial<IUser>) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: payload.email },
    payload,
    {
      new: true,
    }
  );
  return updatedUser;
};

const getAllUsers = async () => {
  const users = await User.find().select("-password").lean();
  return users;
};

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new AppError(404, "User Does not Exists");
  } else {
    return user;
  }
};

const blockUser = async (email: string) => {
  const result = await User.findOneAndUpdate(
    { email },
    { isBlocked: true },
    { new: true }
  );
  return result;
};
const unblockUser = async (email: string) => {
  const result = await User.findOneAndUpdate(
    { email },
    { isBlocked: false },
    { new: true }
  );
  return result;
};

const makeAdmin = async (email: string) => {
  const res = await User.findOneAndUpdate(
    { email },
    { role: "admin" },
    { new: true }
  );
  return res;
};
const removeFromAdmin = async (email: string) => {
  const res = await User.findOneAndUpdate(
    { email },
    { role: "user" },
    { new: true }
  );
  return res;
};

const follow = async (userId: string, followId: string) => {
  const user = await User.findById(userId);
  const followUser = await User.findById(followId);

  if (!user || !followUser) {
    throw new AppError(404, "User Does not Exists");
  }
  if (user.following?.includes(followId)) {
    throw new AppError(400, "Already Following");
  }

  user.following?.push(followId);
  followUser.followers?.push(userId);

  await user.save();
  await followUser.save();
};

const unFollow = async (userId: string, unFollowId: string) => {
  const user = await User.findById(userId);
  const unFollowUser = await User.findById(unFollowId);

  if (!user || !unFollowUser) {
    throw new AppError(404, "User Does Not Exists");
  }

  user.following = user?.following?.filter((id) => id !== unFollowId);
  unFollowUser.followers = unFollowUser?.followers?.filter(
    (id) => id !== userId
  );

  await user.save();
  await unFollowUser.save();
};

const deleteUser = async (userId: string) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

export const UserServices = {
  updateProfile,
  getAllUsers,
  getUserByEmail,
  blockUser,
  makeAdmin,
  removeFromAdmin,
  unblockUser,
  follow,
  unFollow,
  deleteUser,
};
