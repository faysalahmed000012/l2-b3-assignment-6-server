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
exports.PaymentControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const payment_services_1 = require("./payment.services");
const makePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const result = yield payment_services_1.PaymentServices.makePayment(userId);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
const confirmationController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transectionId = req.query.trnx;
    const userId = req.body.userId;
    const result = yield payment_services_1.PaymentServices.successPayment(transectionId);
    if (result) {
        res.redirect(`${config_1.default.client_url}/payment/success/${transectionId}`);
    }
}));
const failedPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transectionId = req.query.trnx;
    const result = yield payment_services_1.PaymentServices.failedPayment(transectionId);
    if (result) {
        res.redirect(`${config_1.default.client_url}/payment/failed`);
    }
}));
exports.PaymentControllers = {
    confirmationController,
    failedPayment,
    makePayment,
};
