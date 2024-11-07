import mongoose from 'mongoose';
import {Ticket} from '../models/ticket.js';
import setPriority from '../utils/setPriority.js';

export const createTicket = async (req,res)=>{
    try {
        const { title, description, category } = req.body;
    
        // Validate required fields
        if (!title || !description || !category) {
          return res.status(400).json({ message: "Title, description, and category are required" });
        }
    
        // Create a new ticket instance
        const ticket = new Ticket({
          title,
          description,
          category,
          customer: req.user.user, // Assuming req.user.user contains customer ID
        });
    
        // Set ticket priority based on description
        ticket.priority = setPriority(description);
    
        // Save the ticket to the database
        await ticket.save();
    
        console.log("New ticket created:", ticket);
        res.status(201).json({ message: "Ticket created successfully", ticket });
      } catch (error) {
        console.error("Ticket creation error:", error);
        res.status(500).json({ message: "An error occurred while creating the ticket" });
      }
}

export const getTickets = async(req,res)=>{
    let tickets;
    if(req.user.user.role === "agent"){
        tickets = await Ticket.find({agent:req.user.user._id}).populate({
            path:"customer",
            select:"-password"
        })
    }else if(req.user.user.role === "admin"){
        tickets = await Ticket.find().populate({
            path:"customer",
            select:"-password"
        })
        tickets = tickets.sort((a,b)=>{
            const priorityOrder = {'high':1,'medium':2,'low':3}
            return priorityOrder[a.priority] - priorityOrder[b.priority]
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

export const getTicket = async (req,res)=>{
    try {
        const { id } = req.params;
    
        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ticket ID format" });
        }
    
        // Find the ticket by ID
        const ticket = await Ticket.findById(id).populate({
            path: "customer",
            select: "-password"
        })
        if (!ticket) {
          return res.status(404).json({ message: "Ticket not found" });
        }
    
        // Return the ticket details if found
        return res.status(200).json(ticket);
        
      } catch (error) {
        console.error("Error fetching ticket:", error);
        res.status(500).json({ message: "An error occurred while fetching the ticket" });
      }
}