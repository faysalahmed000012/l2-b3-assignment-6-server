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
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const updateProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ email: payload.email }, payload, {
        new: true,
    });
    return updatedUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().select("-password").lean();
    return users;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User Does not Exists");
    }
    else {
        return user;
    }
});
const blockUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email }, { isBlocked: true }, { new: true });
    return result;
});
const unblockUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email }, { isBlocked: false }, { new: true });
    return result;
});
const makeAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findOneAndUpdate({ email }, { role: "admin" }, { new: true });
    return res;
});
const removeFromAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findOneAndUpdate({ email }, { role: "user" }, { new: true });
    return res;
});
const follow = (userId, followId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield user_model_1.User.findById(userId);
    const followUser = yield user_model_1.User.findById(followId);
    if (!user || !followUser) {
        throw new AppError_1.default(404, "User Does not Exists");
    }
    if ((_a = user.following) === null || _a === void 0 ? void 0 : _a.includes(followId)) {
        throw new AppError_1.default(400, "Already Following");
    }
    (_b = user.following) === null || _b === void 0 ? void 0 : _b.push(followId);
    (_c = followUser.followers) === null || _c === void 0 ? void 0 : _c.push(userId);
    yield user.save();
    yield followUser.save();
});
const unFollow = (userId, unFollowId) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const user = yield user_model_1.User.findById(userId);
    const unFollowUser = yield user_model_1.User.findById(unFollowId);
    if (!user || !unFollowUser) {
        throw new AppError_1.default(404, "User Does Not Exists");
    }
    user.following = (_d = user === null || user === void 0 ? void 0 : user.following) === null || _d === void 0 ? void 0 : _d.filter((id) => id !== unFollowId);
    unFollowUser.followers = (_e = unFollowUser === null || unFollowUser === void 0 ? void 0 : unFollowUser.followers) === null || _e === void 0 ? void 0 : _e.filter((id) => id !== userId);
    yield user.save();
    yield unFollowUser.save();
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(userId);
    return result;
});
const getFollowersAndFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(userId)
        .populate("followers")
        .populate("following");
    return result;
});
exports.UserServices = {
    updateProfile,
    getAllUsers,
    getUserByEmail,
    blockUser,
    makeAdmin,
    removeFromAdmin,
    unblockUser,
    follow,
    unFollow,
    deleteUser,
    getFollowersAndFollowing,
};
