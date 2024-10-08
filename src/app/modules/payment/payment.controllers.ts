import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.services";

const makePayment = catchAsync(async (req, res) => {
  const userId = req.body.userId;
  const result = await PaymentServices.makePayment(userId);
  res.status(200).json({
    success: true,
    data: result,
  });
});

const confirmationController = catchAsync(async (req, res) => {
  const transectionId = req.query.trnx;
  const userId = req.body.userId;
  const result = await PaymentServices.successPayment(transectionId as string);

  if (result) {
    res.redirect(`${config.client_url}/payment/success/${transectionId}`);
  }
});

const failedPayment = catchAsync(async (req, res) => {
  const transectionId = req.query.trnx;
  const result = await PaymentServices.failedPayment(transectionId as string);

  if (result) {
    res.redirect(`${config.client_url}/payment/failed`);
  }
});

export const PaymentControllers = {
  confirmationController,
  failedPayment,
  makePayment,
};
