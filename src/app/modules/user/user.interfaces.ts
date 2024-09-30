import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
  role: "admin" | "user";
  posts?: string[];
  likes?: string[];
  comments?: string[];
  ratedPosts?: string[];
  followers?: string[];
  isPremium: boolean;
  resetPasswordExpires: string | number | Date | undefined;
  resetPasswordToken: string | undefined;
  premiumExpires?: Date | null;
  passwordChangedAt: Date;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
