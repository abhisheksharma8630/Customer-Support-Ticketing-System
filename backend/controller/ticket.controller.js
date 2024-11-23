import mongoose from 'mongoose';
import { Ticket } from '../models/ticket.js';
import { Agent, Customer, User } from '../models/user.js'
import setPriority from '../utils/setPriority.js';
import { createOtp, generateRandomPassword } from '../utils/helper.js';
import sendMail from '../utils/sendEmail.js';


export const createTicket = async (req, res) => {
  try {
    const { email, title, description, category } = req.body;
    if (!email || !title || !description || !category) {
      return res.status(400).json({ message: "Title, description, and category are required" });
    }

    let customer = await Customer.findOne({ email });

    if (!customer) {
      const user = await User.findOne({ email });
      if(!user)
      return res.status(404).json({ message: "User not found. Please verify your email before creating a ticket." });
      await User.findOneAndDelete({ _id: user._id });
      let password = generateRandomPassword();
      customer = new Customer({ _id: user._id, email: user.email, name: user.name, password })
      console.log("customer created");
      await sendMail(user.email, 'Email and Password for Login on ticketease ', `Email : ${user.email} and Password ${password}`);
      console.log("email sent successfully");
    }

    const ticket = new Ticket({
      title,
      description,
      category,
      customer: customer._id // Associate the ticket with the customer's ID
    });

    // Set ticket priority based on description
    ticket.priority = setPriority(description);

    // Save the ticket to the database
    await ticket.save();
    customer.tickets.push(ticket._id);
    await customer.save();

    console.log("New ticket created:", ticket);
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    console.error("Ticket creation error:", error);
    res.status(500).json({ message: "An error occurred while creating the ticket" });
  }
}

export const getTickets = async (req, res) => {
  try {
    // Initialize the filter object
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status; // Add 'status' to filter only if provided
    }

    let tickets;

    if (req.user.user.role === "agent") {
      // Agent can view tickets assigned to them
      tickets = await Ticket.find({ agent: req.user.user._id, ...filter }).populate({
        path: "customer",
        select: "-password",
      });
    } else if (req.user.user.role === "admin") {
      // Admin can view all tickets with the filter
      tickets = await Ticket.find({ ...filter }).populate({
        path: "customer",
        select: "-password",
      }).populate({
        path:"agent",
        select:"name",
        // match:{$ne:null}
      });

      // Sort tickets by priority
      tickets = tickets.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else {
      // Customers can only view their tickets
      tickets = await Ticket.find({ customer: req.user.user._id, ...filter }).populate({
        path: "customer",
        select: "-password",
      });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "An error occurred while fetching tickets." });
  }
};


export const assignedTickets = async (req, res) => {
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

export const getTicket = async (req, res) => {
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
    }).populate({
      path: "agent",
      select: "-password -email -assignedTickets -isAvailable"
    }).populate({
      path: "history.updatedBy",
      select: "-password -email -assignedTickets -isAvailable"
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


export const addTicketHistory = async (req, res) => {
  const ticketId = req.params.id;
  const { status, updatedBy, notes } = req.body;

  if (!ticketId || !status || !updatedBy) {
    return res.status(400).json({ message: 'ticketId, status, and updatedBy are required.' });
  }

  if (status == "closed") {
    return res.status(400).json({ message: 'To close ticket follow the procedure.' });
  }

  try {
    // Fetch the ticket to check its current status
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if the ticket is closed
    if (ticket.status === 'closed') {
      return res.status(400).json({ message: 'Updates are not allowed on closed tickets.' });
    }

    const update = {
      $push: {
        history: {
          status,
          updatedBy,
          notes,
        },
      },
      status: status,
      updatedAt:Date.now()
    };

    // Update ticket with the new status and history
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, update)
      .populate('history.updatedBy', 'name');

    if (!updatedTicket) {
      throw new Error('Ticket update failed');
    }

    // Respond with the updated ticket
    res.status(200).json({
      message: 'Ticket history updated successfully',
      ticket: updatedTicket,
    });

  } catch (error) {
    console.error('Error updating ticket history:', error);
    res.status(500).json({ message: 'Failed to update ticket history', error: error.message });
  }
};

const otpStore = new Map();
export const sendCloseTicketOtp = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ticket ID." });
    }

    const ticket = await Ticket.findById(id).populate("customer");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    if (ticket.status === "closed") {
      return res.status(400).json({ message: "Ticket is already closed." });
    }

    const otp = createOtp();
    otpStore.set(id, otp); // Store OTP against the ticket ID
    await sendMail(ticket.customer.email, "Ticket Closure OTP", `Your OTP to close the ticket is ${otp}`);

    res.status(200).json({ message: "OTP sent to the registered email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export const closeTicket = async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;
  const status = "closed";

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ticket ID." });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    if (ticket.status === "closed") {
      return res.status(400).json({ message: "Ticket is already closed." });
    }

    // Validate OTP
    const storedOtp = otpStore.get(id);
    if (!storedOtp || storedOtp != otp) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Close the ticket
    const update = {
      $push: {
        history: {
          status,
          updatedBy: req.user.user._id,
          notes: "Your ticket is closed",
        },
      },
      updatedAt:Date.now(),
      status: status,
    };

    // Update ticket with the new status and history
    const updatedTicket = await Ticket.findByIdAndUpdate(id, update)
      .populate('history.updatedBy', 'name');

    // Remove OTP from the store
    otpStore.delete(id);

    res.status(200).json({ message: "Ticket successfully closed.", updatedTicket });
  } catch (error) {
    console.error("Error closing ticket:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
