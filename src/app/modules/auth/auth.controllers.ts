import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

const registerUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.registerUser(user);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.userLogin(req.body);
  const { accessToken, refreshToken, user } = result;
  const { password, ...rest } = user;
  const updatedUser = { ...rest, password: "" };

  const response = res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV !== "development",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: accessToken,
    data: updatedUser,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Access token generated successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const result = await AuthServices.changePassword(
    email,
    oldPassword,
    newPassword
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Password Changed successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  userLogin,
  refreshToken,
  changePassword,
};
