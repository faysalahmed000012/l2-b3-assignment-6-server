import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  const { accessToken, refreshToken, user } = result;
  const { password, ...rest } = user;
  const updatedUser = { ...rest, password: "" };

  const response = res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV !== "development",
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    statusCode: 200,
    message: "User Registered successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.userLogin(req.body);
  const { accessToken, refreshToken, user } = result;
  const { password, ...rest } = user;
  const updatedUser = { ...rest, password: "" };

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV !== "development",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    AccessToken: accessToken,
    RefreshToken: refreshToken,
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

const getUserByEmail = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await AuthServices.getUserByEmail(email);

  res.status(200).json({
    success: true,
    message: "User Retrieved Successfully",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthServices.forgotPassword(email);

  res.status(200).json({
    success: true,
    message: "Password Reset Email sent",
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const result = await AuthServices.resetPassword(token, password);

  res.status(200).json({
    success: true,
    message: "Password Has Been Reset",
  });
});

export const AuthControllers = {
  registerUser,
  userLogin,
  refreshToken,
  changePassword,
  getUserByEmail,
  forgotPassword,
  resetPassword,
};
