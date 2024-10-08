import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/createToken";
import { IUser } from "../user/user.interfaces";
import { User } from "../user/user.model";

const registerUser = async (payload: IUser) => {
  // checking is user already exists
  const email = payload.email;
  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError(409, "User Already Exists");
  }
  const user = await User.create(payload);
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_accessToken_secret as string,
    config.jwt_accessToken_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refreshToken_secret as string,
    config.jwt_refreshToken_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export interface ILogin {
  email: string;
  password: string;
}

const userLogin = async (payload: ILogin) => {
  const email = payload.email;
  const password = payload.password;
  const user = await User.findOne({ email }).select("+password").lean();

  if (!user) {
    throw new AppError(404, "User Does  Not Exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new AppError(403, "Wrong Password");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_accessToken_secret as string,
    config.jwt_accessToken_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refreshToken_secret as string,
    config.jwt_refreshToken_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refreshToken_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not Found!");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_accessToken_secret as string,
    config.jwt_accessToken_expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userEmail: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findOne({
    email: userEmail,
  }).select("+password");

  if (!user) {
    throw new AppError(401, "Email or Password is Wrong");
  }

  if (!(await User.isPasswordMatched(oldPassword, user?.password)))
    throw new AppError(401, "Password do not matched");

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    { email: userEmail },
    { password: newHashedPassword },
    { new: true }
  );

  return result;
};

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(404, "User Does not Exists");
  } else {
    return user;
  }
};

const forgotPassword = async (email: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "faysal000012@gmail.com",
      pass: "ukdxgjgnnjzpqqmz",
    },
  });

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not Found");
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  const resetLink = `https://l2-b3-assignment-6-client.vercel.app/reset-password/${resetToken}`;

  const mailOptions = {
    from: "faysal000012@gmail.com",
    to: user.email,
    subject: "Password Reset Link",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetLink}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (error: any) => {
    if (error) {
      throw new AppError(500, "Error Sending Email");
    } else {
      return "Password reset Email sent";
    }
  });
};

const resetPassword = async (token: string, password: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    throw new AppError(400, "Password reset Token is invalid or expires");
  }

  user.password = password; // Assuming you hash the password in your User model's pre-save hook
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return "Password changed successfully";
};

export const AuthServices = {
  registerUser,
  userLogin,
  refreshToken,
  changePassword,
  getUserByEmail,
  forgotPassword,
  resetPassword,
};
