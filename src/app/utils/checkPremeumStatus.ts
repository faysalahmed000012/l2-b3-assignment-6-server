import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";

export const checkPremiumStatus = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User Does Not Exists");
  }

  if (
    user.isPremium &&
    user.premiumExpires &&
    user.premiumExpires < new Date()
  ) {
    user.isPremium = false;
    user.premiumExpires = null;
    await user.save();
    return false;
  } else {
    return true;
  }
};
