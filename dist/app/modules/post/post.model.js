"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const commentSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const PostSchema = new mongoose_1.Schema({
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
            user: mongoose_1.Schema.Types.ObjectId,
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
            user: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
function arrayLimit(val) {
    return val.length <= 5;
}
exports.Post = mongoose_1.default.model("Post", PostSchema);
