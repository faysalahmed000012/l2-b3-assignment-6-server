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
exports.PostServices = void 0;
const queryBuilder_1 = __importDefault(require("../../../builder/queryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const post_model_1 = require("./post.model");
const createPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.create(data);
    return result;
});
const getAllPosts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const postQuery = new queryBuilder_1.default(post_model_1.Post.find().populate("author"), query)
        .search(["title", "description"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield postQuery.modelQuery;
    const meta = yield postQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(id).populate("author");
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    return post;
});
const getPostByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = post_model_1.Post.find({ author: userId }).populate("author");
    return posts;
});
const getAllLikes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const posts = post_model_1.Post.find({ author: userId }).select("likes");
    // const totalLikes = (await posts).reduce(
    //   (sum, item) => sum + (item.upVotes || 0),
    //   0
    // );
    const totalLikes = (_a = (yield posts)) === null || _a === void 0 ? void 0 : _a.length;
    return totalLikes;
});
const getUserLikedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = post_model_1.Post.find({ "likes.user": userId }).populate("author");
    return posts;
});
const updatePost = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const comment = (postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOneAndUpdate({ _id: postId }, { $addToSet: { comments: comment } }, {
        new: true,
    });
    return result;
});
const deleteComment = (postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: { _id: comment.userId } } }, {
        new: true,
    });
    return result;
});
const editComment = (postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPost = yield post_model_1.Post.findOneAndUpdate({
        _id: postId,
        "comments._id": comment.userId,
    }, {
        $set: {
            "comments.$.content": comment.content,
        },
    }, { new: true });
    return updatedPost;
});
const manageVote = (postId, userId, voteType) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    let updatedPost;
    if (voteType === "upVote") {
        //post.likes?.push({user: userId})
        //@ts-ignore
        if (post.likes.length == 0) {
            updatedPost = yield post_model_1.Post.findByIdAndUpdate(postId, { $set: { likes: [{ user: userId }] } }, { new: true });
        }
        else {
            updatedPost = yield post_model_1.Post.findByIdAndUpdate(postId, { $addToSet: { "likes.user": userId } }, { new: true });
        }
    }
    else if (voteType === "downVote") {
        updatedPost = yield post_model_1.Post.findByIdAndUpdate(postId, {
            $pull: { likes: { user: userId } },
        }, { new: true });
    }
    // const existingVoteIndex = post.votes!.findIndex(
    //   (v) => v.user.toString() === userId
    // );
    // const voteValue = voteType === "upVote" ? 1 : -1;
    // if (existingVoteIndex > -1) {
    //   const existingVote = post.votes![existingVoteIndex];
    //   if (existingVote.vote === voteValue) {
    //     post?.votes?.splice(existingVoteIndex, 1);
    //     post[voteType === "upVote" ? "upVotes" : "downVotes"]! -= 1;
    //   } else {
    //     existingVote.vote = voteValue;
    //     (post.upVotes as number) += voteValue;
    //     (post.downVotes as number) - +voteValue;
    //   }
    // } else {
    //   post.votes!.push({ user: userId, vote: voteValue });
    //   post[voteType === "upVote" ? "upVotes" : "downVotes"]! += 1;
    // }
    // await post.save();
    return updatedPost;
});
const addRating = (postId, userId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    if (rating < 0 || rating > 5) {
        throw new AppError_1.default(400, "Invalid rating");
    }
    // const updatedPost = await Post.findByIdAndUpdate(
    //   postId,
    //   { $addToSet: { ratings: { user: userId, rating: rating } } },
    //   { new: true }
    // );
    const existingRatingIndex = post.ratings.findIndex((r) => r.user.toString() === userId);
    if (existingRatingIndex > -1) {
        //  const oldRating = post.ratings![existingRatingIndex].rating;
        post.ratings[existingRatingIndex].rating = rating;
        // post.ratingSum = (post.ratingSum as number) - oldRating + rating;
    }
    else {
        post.ratings.push({ user: userId, rating: rating });
        // (post.totalRatings as number) += 1;
        // (post.ratingSum as number) += rating;
    }
    // post.averageRating =
    //   (post.ratingSum as number) / (post.totalRatings as number);
    yield post.save();
    return post;
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndDelete({ _id: id });
    return result;
});
const approvePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(id, { status: "posted" }, { new: true });
    if (!result) {
        throw new AppError_1.default(404, "post now found");
    }
    return result;
});
exports.PostServices = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    approvePost,
    comment,
    manageVote,
    addRating,
    getPostByUser,
    getUserLikedPosts,
    getPostById,
    deleteComment,
    editComment,
    getAllLikes,
};
