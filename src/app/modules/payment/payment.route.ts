import { Router } from "express";
import { PaymentControllers } from "./payment.controllers";

const router = Router();

router.post("/", PaymentControllers.makePayment);
router.post("/confirmation", PaymentControllers.confirmationController);
router.post("/failed", PaymentControllers.failedPayment);

export const paymentRoutes = router;
