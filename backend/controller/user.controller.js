import {User} from '../models/user.js';
import {generateToken} from '../utils/generateToken.js';

export const signup = async (req,res)=>{
    const {name,email,password,role} = req.body;
    const user = new User({name,email,password,role});
    await user.save();
    res.send("User signup successful");
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