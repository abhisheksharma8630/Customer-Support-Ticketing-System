import { Router } from "express";
import {signup} from "../controller/user.controller.js"
const router = Router();

router.route("/signup").post(signup)
router.route("/login").post()
router.route("/logout").post()

export default router;