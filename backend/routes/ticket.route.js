import { Router } from "express";
import { assignedTickets, createTicket, getTicket, getTickets } from "../controller/ticket.controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = Router();

router.route("/").post(authenticateToken,createTicket)
router.route("/").get(authenticateToken,getTickets);
router.route("/assignedTickets").post(assignedTickets)
router.route("/:id").get(getTicket)
router.route("/:id/status").patch()

export default router;