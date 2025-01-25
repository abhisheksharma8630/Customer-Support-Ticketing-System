import mongoose from 'mongoose';
import { Ticket } from '../models/ticket.js';
import { Agent, Customer, User } from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken'
import { createOtp } from '../utils/helper.js';
import sendMail from '../utils/sendEmail.js'

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email already exists in either Agent or User collection
        const existingUser = await Agent.findOne({ email }) || await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        // Determine the role and save to the respective collection
        if (role === 'agent') {
            const agent = new Agent({ name, email, password, role });
            await agent.save();
            res.status(201).json({ message: "Agent signup successful" });
        } else if (role === 'customer') {
            const user = new Customer({ name, email, password, role });
            await user.save();
            res.status(201).json({ message: "User signup successfully" });
        } else {
            return res.status(403).json({ error: "Unauthorized role" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        // Verify password
        const isMatch = password === user.password; // Ideally use bcrypt for hashing
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Generate token
        const token = generateToken(user);
        res.status(200).json({message: "User Logged In Successfull",token});

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred while logging in" });
    }
}

export const verifyToken = async (req, res) => {
    const { accessToken } = req.body;
    
    // Check if the access token is provided
    if (!accessToken) {
      console.log("Access token missing");
      return res.status(400).send({ message: "Access token is required" });
    }
  
    try {
      // Verify the access token
      const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
  
      // Find the user by ID
      const user = await User.findById(decodedAccessToken.user._id);
  
      if (!user) {
        console.log("User doesn't exist for the provided token");
        return res.status(404).send({ message: "User not found" });
      }
  
      return res.status(200).send({
        message: "User verified successfully",
        role: user.role,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Token has expired");
        return res.status(401).send({ message: "Token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        console.log("Invalid token");
        return res.status(401).send({ message: "Invalid token" });
      } else {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send({ message: "An unexpected error occurred" });
      }
    }
  };
  

export const logout = (req, res) => {
    const options = {
        httpOnly: false, // can only be modified by server not by client-side
        secure: true
    }
    res.clearCookie('accessToken', options);
    res.status(200).send("Logged out successfully");
}

export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.aggregate([
            {
                $lookup: {
                    from: "tickets", // The name of the Ticket collection
                    localField: "assignedTickets",
                    foreignField: "_id",
                    as: "ticketDetails",
                },
            },
            {
                $addFields: {
                    activeTickets: {
                        $filter: {
                            input: "$ticketDetails",
                            as: "ticket",
                            cond: { $ne: ["$$ticket.status", "closed"] },
                        },
                    },
                },
            },
            {
                $addFields: {
                    assignedTicketsCount: { $size: "$activeTickets" },
                },
            },
            {
                $project: {
                    name: 1,
                    assignedTicketsCount: 1,
                },
            },
            {
                $sort: {
                    assignedTicketsCount: -1, // Sort in descending order
                },
            },
        ]);

        console.log(agents);
        res.json(agents);
    } catch (error) {
        console.error("Error fetching agents:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const assignAgent = async (req, res) => {
    const { agentId, ticketId } = req.body;
    
    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the agent and ticket within the transaction session
        const agent = await Agent.findOne({ _id: agentId }).session(session);
        const ticket = await Ticket.findById(ticketId).session(session);

        if (!agent || !ticket) {
            // If either agent or ticket is not found, abort the transaction and return a 404 error
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Agent or Ticket not found" });
        }

        // Assign agent to the ticket and push the ticket to the agent's assignedTickets
        ticket.agent = agentId;
        ticket.updatedAt = Date.now();
        agent.assignedTickets.push(ticketId);
        agent.isAvailable = false;

        // Save both documents within the transaction
        await ticket.save({ session });
        await agent.save({ session });
        // Commit the transaction if both saves are successful
        await session.commitTransaction();
        session.endSession();
            const pipeline = [
              { 
                $match: { _id: new mongoose.Types.ObjectId(ticketId) } // Ensure ticketId is an ObjectId
              },
              {
                $lookup: {
                  from: "users", // Lookup customer details
                  localField: "customer",
                  foreignField: "_id",
                  as: "customer",
                },
              },
              {
                $lookup: {
                  from: "users", // Lookup agent details
                  localField: "agent",
                  foreignField: "_id",
                  as: "agent",
                },
              },
              {
                $unwind: {
                  path: "$customer",
                  preserveNullAndEmptyArrays: true, // Keep tickets without a customer populated
                },
              },
              {
                $unwind: {
                  path: "$agent",
                  preserveNullAndEmptyArrays: true, // Keep tickets without an agent populated
                },
              },
              {
                $addFields: {
                  customerName: "$customer.name", // Add customer name
                  agentName: "$agent.name",      // Add agent name
                },
              },
              {
                $project: {
                  title: 1,
                  category: 1,
                  status: 1,
                  priority: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  customerName: 1,
                  agentName: 1,
                },
              },
            ];
        
            // Apply the aggregation pipeline
        const ticketDetails = await Ticket.aggregate(pipeline);
        res.status(200).json({ message: "Agent assigned successfully",updatedTicket:ticketDetails[0]});
    } catch (error) {
        // Rollback any changes made within the transaction if an error occurs
        await session.abortTransaction();
        session.endSession();

        console.error("Error assigning agent:", error);
        res.status(500).json({ message: "An error occurred while assigning the agent", error: error.message });
    }
}

const OTP_STORE = {};

export const verifyEmail = async (req, res) => {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }

    const otp = createOtp();

    const otpExpiration = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Store OTP and expiration in OTP_STORE (or a database in production)
    OTP_STORE[email] = { otp, expiresAt: otpExpiration };

    try {
        await sendMail(email, 'OTP Verification from Ticketease', `Your OTP is ${otp}`);
        return res.status(200).json({ message: 'OTP sent successfully.' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
    }

}

export const verifyOtp = async (req,res)=>{
    const { email, otp } = req.body;
    console.log(OTP_STORE)
    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }
  
    const storedOtpData = OTP_STORE[email];
  
    if (!storedOtpData) {
      return res.status(400).json({ message: 'No OTP found for this email.' });
    }
  
    const { otp: storedOtp, expiresAt } = storedOtpData;
  
    // Check if OTP has expired
    if (Date.now() > expiresAt) {
      delete OTP_STORE[email]; // Clear expired OTP
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
  
    // Verify OTP
    if (storedOtp != otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
  
    // OTP is verified, clear the OTP data
    delete OTP_STORE[email];

    const user = await User.findOne({email});
    if(!user){
        const name = email.split('@')[0]; // Take part before '@' as name
        const expiresAt_User = new Date(Date.now() + 600 * 1000); 
        
        const partialUser = new User({
            name,
            email,
            expiresAt:expiresAt_User,
        });
        await partialUser.save();
    } 

    return res.status(200).json({ message: 'Email verified successfully.' });
  };