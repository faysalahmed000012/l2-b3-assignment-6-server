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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createToken_1 = require("../../utils/createToken");
const user_model_1 = require("../user/user.model");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking is user already exists
    const email = payload.email;
    const exists = yield user_model_1.User.findOne({ email });
    if (exists) {
        throw new AppError_1.default(409, "User Already Exists");
    }
    const user = yield user_model_1.User.create(payload);
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_accessToken_secret, config_1.default.jwt_accessToken_expires_in);
    const refreshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_refreshToken_secret, config_1.default.jwt_refreshToken_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const password = payload.password;
    const user = yield user_model_1.User.findOne({ email }).select("+password").lean();
    if (!user) {
        throw new AppError_1.default(404, "User Does  Not Exist");
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new AppError_1.default(403, "Wrong Password");
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_accessToken_secret, config_1.default.jwt_accessToken_expires_in);
    const refreshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_refreshToken_secret, config_1.default.jwt_refreshToken_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refreshToken_secret);
    const { email } = decoded;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not Found!");
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_accessToken_secret, config_1.default.jwt_accessToken_expires_in);
    return {
        accessToken,
    };
});
const changePassword = (userEmail, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: userEmail,
    }).select("+password");
    if (!user) {
        throw new AppError_1.default(401, "Email or Password is Wrong");
    }
    if (!(yield user_model_1.User.isPasswordMatched(oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(401, "Password do not matched");
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.findOneAndUpdate({ email: userEmail }, { password: newHashedPassword }, { new: true });
    return result;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(404, "User Does not Exists");
    }
    else {
        return user;
    }
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "faysal000012@gmail.com",
            pass: "ukdxgjgnnjzpqqmz",
        },
    });
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User not Found");
    }
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    yield user.save();
    const resetLink = `${config_1.default.client_url}reset-password/${resetToken}`;
    const mailOptions = {
        from: "faysal000012@gmail.com",
        to: user.email,
        subject: "Password Reset Link",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetLink}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            throw new AppError_1.default(500, "Error Sending Email");
        }
        else {
            return "Password reset Email sent";
        }
    });
});
const resetPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    }).select("+password");
    if (!user) {
        throw new AppError_1.default(400, "Password reset Token is invalid or expires");
    }
    user.password = password; // Assuming you hash the password in your User model's pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    yield user.save();
    return "Password changed successfully";
});
exports.AuthServices = {
    registerUser,
    userLogin,
    refreshToken,
    changePassword,
    getUserByEmail,
    forgotPassword,
    resetPassword,
};
