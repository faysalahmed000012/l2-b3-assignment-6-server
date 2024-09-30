import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const updateProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.updateProfile(payload);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserControllers = {
  updateProfile,
};
