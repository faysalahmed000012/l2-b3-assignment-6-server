import axios from "axios";
import config from "../config";

export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    tran_id: paymentData.tranId,
    success_url: `${config.application_url}/api/payment/confirmation?trnx=${paymentData.tranId}`,
    fail_url: `${config.application_url}/api/payment/failed?trnx=${paymentData.tranId}`,
    cancel_url: `${config.application_url}/api/payment/failed?trnx=${paymentData.tranId}`,
    amount: paymentData.payableAmount,
    currency: "BDT",
    signature_key: config.signature_key,
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
  return response?.data;
};
