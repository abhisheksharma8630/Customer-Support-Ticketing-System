import { Router } from "express";
import {assignAgent, getAgents, login, logout, signup, verifyEmail, verifyOtp, verifyToken} from "../controller/user.controller.js"
import { authenticateTokenForAdmin } from "../middlewares/authenticateToken.js";
const router = Router();

router.route("/signup").post(signup)
router.route("/signup-agent").post(authenticateTokenForAdmin,signup);
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/verify-token").post(verifyToken)
router.route("/get-agents").get(getAgents)
router.route("/assign-agents").post(assignAgent)
router.route("/send-otp").post(verifyEmail)
router.route("/verify-otp").post(verifyOtp)
router.route("/verify-admin").get(authenticateTokenForAdmin);

export default router;