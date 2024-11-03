import {Ticket} from '../models/ticket.js';

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
    let tickets;
    if(req.user.user.role === "agent" || req.user.user.role === "admin"){
        tickets = await Ticket.find().populate({
            path:"customer",
            select:"-password"
        })
    }else{
        tickets = await Ticket.find({ customer: req.user.user._id }).populate({
            path: "customer",
            select: "-password"
        });
    }

    console.log(tickets)
    res.send(tickets);
}

export const assignedTickets = async (req,res)=>{
    const { agentId } = req.body;
    try {
      // Find all tickets assigned to the specified agent
      const assignedTickets = await Ticket.find({ agent: agentId });
  
      // Check if any tickets are found
      if (!assignedTickets.length) {
        return res.status(404).json({ message: "No tickets assigned to this agent." });
      }
  
      // Return the list of assigned tickets
      res.status(200).json({ assignedTickets });
    } catch (error) {
      console.error("Error fetching assigned tickets:", error);
      res.status(500).json({ message: "An error occurred while fetching tickets", error: error.message });
    }
}