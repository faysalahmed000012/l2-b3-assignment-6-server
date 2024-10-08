import moment from "moment";
import AppError from "../../errors/AppError";
import { initiatePayment } from "../../utils/payment";
import { User } from "../user/user.model";

const makePayment = async (userId: string) => {
  const tranId = `TXN-${Date.now()}`;
  const user = await User.findByIdAndUpdate(
    userId,
    { tranId: tranId },
    { new: true }
  ).lean();
  const paymentData = {
    tranId: tranId,
    payableAmount: 5,
  };

  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};

const successPayment = async (tranId: string) => {
  const user = await User.findOne({ tranId: tranId });

  if (!user) {
    throw new AppError(404, "User Does Not Exists");
  }

  user.isPremium = true;
  user.premiumExpires = moment().add(1, "months").toDate();

  await user.save();
  return true;
};

const failedPayment = async (tranId: string) => {
  const user = await User.findOneAndUpdate(
    { tranId: tranId },
    { tranId: "" },
    { new: true }
  );

  return user;
};

export const PaymentServices = {
  makePayment,
  successPayment,
  failedPayment,
};
