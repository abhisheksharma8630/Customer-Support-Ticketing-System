import mongoose from 'mongoose';
import { Ticket } from '../models/ticket.js';
import {Agent, User} from '../models/user.js';
import {generateToken} from '../utils/generateToken.js';
import jwt from 'jsonwebtoken'

export const signup = async (req,res)=>{
    const {name,email,password,role} = req.body;
    if(role === 'agent'){
        const agent = new Agent({name,email,password,role});
        await agent.save()
        res.send("agent signup successfully");
    }else{
        const user = new User({name,email,password,role});
        await user.save();
        res.send("User signup successful");
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(400).send("User doesn't exist")

    const isMatch = password === user.password
    if (!isMatch) return res.status(400).send('Wrong Password');

    const token = generateToken(user);
    res.status(201).send({token,user});
}

export const verifyToken = async (req,res)=>{
    const { accessToken } = req.body;

    if (!accessToken) {
        console.log("Access token missing");
        return;
    }

    try {
        // Verify the access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
        const user = await User.findById(decodedAccessToken.user._id);

        if (!user) {
            console.log("User doesn't exist for the provided token");
            return;
        }

        console.log("User verified successfully");
        return res.status(200).send({message: "User verified successfully",role:user.role});
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.log("Token has expired");
        } else if (error.name === 'JsonWebTokenError') {
            console.log("Invalid token");
        } else {
            console.log('An unexpected error occurred:', error);
        }
    }
}

export const logout = (req,res)=>{
    const options = {
        httpOnly: false, // can only be modified by server not by client-side
        secure: true
    }
    res.clearCookie('accessToken',options);
    res.status(200).send("Logged out successfully");
}

export const getAgents = async (req,res) =>{
    const agents = await Agent.aggregate([
        {
            $match:{
                isAvailable:true
            }
        },{
            $project:{
                name:1
            }
        }
    ]);
    // const agents = await User.aggregate([
    //     {
    //         $match:{
    //             role:"agent"
    //         }
    //     },{
    //         $project:{
    //             name:1,
    //         }
    //     }
    // ]);
    console.log(agents);
    res.json(agents)
}

export const assignAgent = async (req,res)=>{
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
      agent.assignedTickets.push(ticketId);
      agent.isAvailable = false;
  
      // Save both documents within the transaction
      await ticket.save({ session });
      await agent.save({ session });
  
      // Commit the transaction if both saves are successful
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({ message: "Agent assigned successfully" });
    } catch (error) {
      // Rollback any changes made within the transaction if an error occurs
      await session.abortTransaction();
      session.endSession();
  
      console.error("Error assigning agent:", error);
      res.status(500).json({ message: "An error occurred while assigning the agent", error: error.message });
    }
}

