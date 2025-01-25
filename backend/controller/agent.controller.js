import { Agent } from "../models/user.js"

export const createAgent = async(req,res)=>{
    try{
        const {email,department,firstName,lastName,languages,permissions,phoneNumber} = req.body.formData;
        const registeredAgent = await Agent.findOne({email});
        if(registeredAgent) return res.status(409).json("Already exist with the same email");
        const agent = new Agent({email,department,firstName,lastName,languages,permissions,phoneNumber,password:phoneNumber});
        await agent.save();
        return res.status(200).json(agent);
    }catch(error){
        console.log(error);
        res.status(400).json("Internal Error while creating agent");
    }
}
export const getAgents = async(req,res)=>{
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        if(error) return res.status(400).json("error while fetching agents");
    }
}