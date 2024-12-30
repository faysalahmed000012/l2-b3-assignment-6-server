"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const post_services_1 = require("./post.services");
const createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newPost = yield post_services_1.PostServices.createPost(Object.assign(Object.assign({}, JSON.parse(req.body.data)), { image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path }));
    res.status(201).json({
        status: "true",
        message: "Post created successfully",
        data: newPost,
    });
}));
const getAllPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield post_services_1.PostServices.getAllPosts(query);
    res.status(200).json({
        success: true,
        message: "All Posts Fetched Successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getPostById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const post = yield post_services_1.PostServices.getPostById(postId);
    res.status(200).json({
        success: true,
        message: "Post Fetched Successfully",
        data: post,
    });
}));
const getPostByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const post = yield post_services_1.PostServices.getPostByUser(userId);
    res.status(200).json({
        success: true,
        message: "Posts Fetched Successfully",
        data: post,
    });
}));
const getUserLikedPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const post = yield post_services_1.PostServices.getUserLikedPosts(userId);
    res.status(200).json({
        success: true,
        message: "Posts Fetched Successfully",
        data: post,
    });
}));
const getAllLikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const posts = yield post_services_1.PostServices.getAllLikes(userId);
    res.status(200).json({
        success: true,
        message: "All Posts Fetched Successfully",
        data: posts,
    });
}));
const updatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const postId = req.params.postId;
    const result = yield post_services_1.PostServices.updatePost(Object.assign(Object.assign({}, JSON.parse(req.body.data)), { image: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path }), postId);
    res.status(200).json({
        success: true,
        message: "Post Updated Successfully",
        data: result,
    });
}));
const comment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, comment, mode } = req.body;
    let result;
    if (mode == "create") {
        result = yield post_services_1.PostServices.comment(postId, comment);
    }
    else if (mode == "update") {
        result = yield post_services_1.PostServices.editComment(postId, comment);
    }
    else if (mode == "delete") {
        result = yield post_services_1.PostServices.deleteComment(postId, comment);
    }
    res.status(200).json({
        success: true,
        message: "Comment Added Successfully",
        data: result,
    });
}));
const upVote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.body;
    const result = yield post_services_1.PostServices.manageVote(postId, userId, "upVote");
    res.status(200).json({
        success: true,
        message: "You Upvoted This Post",
        data: result,
    });
}));
const downVote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.body;
    const result = yield post_services_1.PostServices.manageVote(postId, userId, "downVote");
    res.status(200).json({
        success: true,
        message: "You Downvoted This Post",
        data: result,
    });
}));
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_services_1.PostServices.deletePost(id);
    res.status(200).json({
        success: true,
        message: "Post Deleted Successfully",
        data: result,
    });
}));
const approvePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield post_services_1.PostServices.approvePost(id);
    res.status(200).json({
        success: true,
        message: "Post Approved Successfully",
        data: result,
    });
}));
const addRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId, rating } = req.body;
    const result = yield post_services_1.PostServices.addRating(postId, userId, rating);
    res.status(200).json({
        success: true,
        message: "You Rated This Post",
        data: result,
    });
}));
exports.PostControllers = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    approvePost,
    comment,
    upVote,
    downVote,
    addRating,
    getPostById,
    getPostByUser,
    getUserLikedPosts,
    getAllLikes,
};
