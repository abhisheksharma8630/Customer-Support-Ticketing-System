import {Ticket} from '../models/ticket.js';
import { User } from '../models/user.js';

export const createTicket = async (req,res)=>{
    const {title,description,category} = req.body;
    const ticket = new Ticket({
        title,
        description,
        category,
        customer:req.user.user,
    })
    await ticket.save();
    console.log(ticket);

    res.send("Ticket created successfully");
}

export const getTickets = async(req,res)=>{
    const tickets = await Ticket.find().populate({
        path:"customer",
        select:"-password"
    })

    console.log(tickets)
    res.send(tickets);
}