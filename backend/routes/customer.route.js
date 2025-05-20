import { Router } from "express";
import {authenticateSubscription} from "../middlewares/authenticateToken.js";
import { createCustomer, makePayment, verifyPayment } from "../controller/customer.controller.js";

const router = Router();

router.route("/").post(authenticateSubscription,createCustomer)
router.route("/createOrder").post(makePayment);
router.route("/verifyPayment").post(verifyPayment);

export default router;