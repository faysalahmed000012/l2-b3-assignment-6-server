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
    replyTo: {
      type: String,
      required: false,
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
    author: {
      type: String,
      required: true,
      ref: "User",
    },

    ratings: [
      {
        user: String,
        rating: Number,
      },
    ],

    likes: [
      {
        user: String,
      },
    ],
    isPremium: {
      type: Boolean,
      default: false,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    servings: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val: any) {
  return val.length <= 5;
}

export const Post = mongoose.model<IPost>("Post", PostSchema);
