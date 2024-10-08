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
exports.PaymentServices = void 0;
const moment_1 = __importDefault(require("moment"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const payment_1 = require("../../utils/payment");
const user_model_1 = require("../user/user.model");
const makePayment = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tranId = `TXN-${Date.now()}`;
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { tranId: tranId }, { new: true }).lean();
    const paymentData = {
        tranId: tranId,
        payableAmount: 5,
    };
    const paymentSession = yield (0, payment_1.initiatePayment)(paymentData);
    return paymentSession;
});
const successPayment = (tranId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ tranId: tranId });
    if (!user) {
        throw new AppError_1.default(404, "User Does Not Exists");
    }
    user.isPremium = true;
    user.premiumExpires = (0, moment_1.default)().add(1, "months").toDate();
    yield user.save();
    return true;
});
const failedPayment = (tranId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ tranId: tranId }, { tranId: "" }, { new: true });
    return user;
});
exports.PaymentServices = {
    makePayment,
    successPayment,
    failedPayment,
};
