import { Router } from "express";
import {assignAgent, getAgents, login, logout, signup, verifyToken} from "../controller/user.controller.js"
const router = Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/verifyToken").post(verifyToken)
router.route("/getAgents").get(getAgents)
router.route("/assignAgent").post(assignAgent)


export default router;