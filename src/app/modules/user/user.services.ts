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

export const UserServices = {
  updateProfile,
};
