import { Router } from "express";
import {login, signup} from "../controller/user.controller.js"
const router = Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post()

export default router;