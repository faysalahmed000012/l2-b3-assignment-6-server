import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import config from "../../config";
import { IUser, UserModel } from "./user.interfaces";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    posts: {
      type: [String],
      ref: "Post",
      required: false,
    },
    likes: {
      type: [String],
      ref: "Post",
      required: false,
    },
    comments: {
      type: [String],
      ref: "Comment",
      required: false,
    },
    ratedPosts: {
      type: [String],
      ref: "Post",
      required: false,
    },
    followers: {
      type: [String],
      ref: "User",
      required: false,
    },
    following: {
      type: [String],
      ref: "User",
      required: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    premiumExpires: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: Schema.Types.Mixed,
      required: false,
    },
    tranId: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Schema.Types.Mixed,
      required: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// hashing  password
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = mongoose.model<IUser, UserModel>("User", UserSchema);
