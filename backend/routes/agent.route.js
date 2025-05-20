import { Router } from "express";
import {authenticateTokenForAdmin} from "../middlewares/authenticateToken.js";
import { createAgent, getAgents } from "../controller/agent.controller.js";

const router = Router();

router.route("/").post(authenticateTokenForAdmin,createAgent)
router.route("/").get(authenticateTokenForAdmin,getAgents);

export default router;