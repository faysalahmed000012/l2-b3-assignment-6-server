import mongoose, { Schema } from "mongoose";
import { IComment, IPost } from "./post.interface";

const commentSchema = new Schema<IComment>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
    image: {
      type: String,
      required: false,
    },
    comments: {
      type: [commentSchema],
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    tags: {
      type: [String],
      enum: [
        "breakfast",
        "lunch",
        "dinner",
        "dessert",
        "snack",
        "vegan",
        "vegetarian",
        "gluten-free",
        "low-carb",
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    cookingTime: {
      type: Number,
      required: [true, "Please specify the cooking time in minutes"],
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    ratingSum: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        user: Schema.Types.ObjectId,
        rating: Number,
      },
    ],
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    votes: [
      {
        user: Schema.Types.ObjectId,
        vote: Number,
      },
    ],
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

function arrayLimit(val: any) {
  return val.length <= 5;
}

export const Post = mongoose.model<IPost>("Post", PostSchema);
