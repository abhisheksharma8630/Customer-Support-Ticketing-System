import { Router } from "express";
import { assignedTickets, createTicket, getTickets } from "../controller/ticket.controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = Router();

router.route("/").post(authenticateToken,createTicket)
router.route("/").get(authenticateToken,getTickets);
router.route("/assignedTickets").post(assignedTickets)
router.route("/:id").get()
router.route("/:id/status").patch()

export default router;