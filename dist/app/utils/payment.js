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
exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_id,
        tran_id: paymentData.tranId,
        success_url: `${config_1.default.application_url}/api/payment/confirmation?trnx=${paymentData.tranId}`,
        fail_url: `${config_1.default.application_url}/api/payment/failed?trnx=${paymentData.tranId}`,
        cancel_url: `${config_1.default.application_url}/api/payment/failed?trnx=${paymentData.tranId}`,
        amount: paymentData.payableAmount,
        currency: "BDT",
        signature_key: config_1.default.signature_key,
        desc: "Merchant Registration Payment",
        cus_name: "User",
        cus_email: "payer@merchantcusomter.com",
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: "+8801704",
        type: "json",
    });
    return response === null || response === void 0 ? void 0 : response.data;
});
exports.initiatePayment = initiatePayment;
