import mongoose, { Schema } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: false,
    },
    likes: {
      type: [String],
      required: false,
      ref: "User",
    },
    comments: {
      type: [String],
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    upVotes: {
      type: Number,
      required: false,
    },
    downVotes: {
      type: Number,
      required: false,
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "posted", "rejected"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);
