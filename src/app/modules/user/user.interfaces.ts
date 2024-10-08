import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
  location?: string;
  role: "admin" | "user";
  posts?: string[];
  likes?: string[];
  comments?: string[];
  ratedPosts?: string[];
  followers?: string[];
  following?: string[];
  isPremium: boolean;
  tranId?: string | null;
  resetPasswordExpires: string | number | Date | undefined;
  resetPasswordToken: string | undefined;
  premiumExpires?: Date | null;
  passwordChangedAt: Date;
  isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
