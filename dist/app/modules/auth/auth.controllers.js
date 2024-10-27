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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_services_1 = require("./auth.services");
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.registerUser(req.body);
    const { accessToken, refreshToken, user } = result;
    const { password } = user, rest = __rest(user, ["password"]);
    const updatedUser = Object.assign(Object.assign({}, rest), { password: "" });
    const response = res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV !== "development",
        httpOnly: true,
    });
    res.status(201).json({
        success: true,
        statusCode: 200,
        message: "User Registered successfully",
        data: result,
    });
}));
const userLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.userLogin(req.body);
    const { accessToken, refreshToken, user } = result;
    const { password } = user, rest = __rest(user, ["password"]);
    const updatedUser = Object.assign(Object.assign({}, rest), { password: "" });
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV !== "development",
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        data: updatedUser,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const result = yield auth_services_1.AuthServices.refreshToken(refreshToken);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Access token generated successfully",
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    const result = yield auth_services_1.AuthServices.changePassword(email, oldPassword, newPassword);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Password Changed successfully",
        data: result,
    });
}));
const getUserByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield auth_services_1.AuthServices.getUserByEmail(email);
    res.status(200).json({
        success: true,
        message: "User Retrieved Successfully",
        data: result,
    });
}));
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_services_1.AuthServices.forgotPassword(email);
    res.status(200).json({
        success: true,
        message: "Password Reset Email sent",
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    const result = yield auth_services_1.AuthServices.resetPassword(token, password);
    res.status(200).json({
        success: true,
        message: "Password Has Been Reset",
    });
}));
exports.AuthControllers = {
    registerUser,
    userLogin,
    refreshToken,
    changePassword,
    getUserByEmail,
    forgotPassword,
    resetPassword,
};
