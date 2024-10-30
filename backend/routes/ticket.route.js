import { Router } from "express";
import { createTicket, getTickets } from "../controller/ticket.controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = Router();

router.route("/").post(authenticateToken,createTicket)
router.route("/").get(getTickets);
router.route("/:id").get()
router.route("/:id/status").patch()

export default router;