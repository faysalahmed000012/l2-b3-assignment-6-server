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
exports.UserControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_services_1.UserServices.updateProfile(Object.assign(Object.assign({}, JSON.parse(req.body.data)), { profilePicture: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path }));
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.getAllUsers();
    res.status(200).json({
        success: true,
        message: "All Users Retrieved Successfully",
        data: result,
    });
}));
const getUserByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield user_services_1.UserServices.getUserByEmail(email);
    res.status(200).json({
        success: true,
        message: "User Retrieved Successfully",
        data: result,
    });
}));
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, block } = req.body;
    let result;
    if (block) {
        result = yield user_services_1.UserServices.blockUser(email);
    }
    else {
        result = yield user_services_1.UserServices.unblockUser(email);
    }
    res.status(200).json({
        success: true,
        message: "User Blocked Successfully",
        data: result,
    });
}));
const makeAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    let result;
    if (role == "admin") {
        result = yield user_services_1.UserServices.makeAdmin(email);
    }
    else {
        result = yield user_services_1.UserServices.removeFromAdmin(email);
    }
    res.status(200).json({
        success: true,
        message: "User Role Changed to Admin Successfully",
        data: result,
    });
}));
const follow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.follower;
    const following = req.body.following;
    const type = req.body.type;
    if (user === following) {
        throw new AppError_1.default(403, "You  cannot follow yourself");
    }
    let result;
    if (type == "follow") {
        result = yield user_services_1.UserServices.follow(user, following);
    }
    else if (type == "unfollow") {
        result = yield user_services_1.UserServices.unFollow(user, following);
    }
    res.status(200).json({
        success: true,
        message: "Following Successfully",
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield user_services_1.UserServices.deleteUser(userId);
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        data: result,
    });
}));
const getFollowersAndFollowing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield user_services_1.UserServices.getFollowersAndFollowing(userId);
    res.status(200).json({
        success: true,
        message: "User Followers and Following Retrieved Successfully",
        data: result,
    });
}));
exports.UserControllers = {
    updateProfile,
    getAllUsers,
    getUserByEmail,
    blockUser,
    makeAdmin,
    follow,
    deleteUser,
    getFollowersAndFollowing,
};
