import { Router } from "express";
import { addTicketHistory, assignedTickets, createTicket, getTicket, getTickets,closeTicket,sendCloseTicketOtp } from "../controller/ticket.controller.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";

const router = Router();

router.route("/").post(createTicket)
router.route("/").get(authenticateToken,getTickets);
router.route("/assignedTickets").post(assignedTickets)
router.route("/:id").get(getTicket)
router.route("/:id").patch(addTicketHistory)
router.route("/close/:id").get(sendCloseTicketOtp);
router.route("/close/:id").patch(authenticateToken,closeTicket);

export default router;