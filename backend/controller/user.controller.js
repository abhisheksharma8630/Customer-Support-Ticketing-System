import {User} from '../models/user.js';

export const signup = async (req,res)=>{
    const {name,email,password,role} = req.body;
    console.table([name,email,password,role]);
    res.send("all good");
}