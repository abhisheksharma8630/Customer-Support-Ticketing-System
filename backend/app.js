import express, { urlencoded } from 'express';
import 'dotenv/config'
import dbconnect from './utils/dbconnect.js';
import userRouter from './routes/user.route.js'
import ticketRouter from './routes/ticket.route.js';
import agentRouter from './routes/agent.route.js';
import customer from './routes/customer.route.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser';


const app = express();
dbconnect().then(()=>console.log("Db connected")).catch(err=>console.log(err))


app.use(cors({
    // origin:'http://localhost:5173',
    methods:'GET,POST,PUT,DELETE',
    credentials:true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})

// app.use("/user",userRouter);
// app.use("/agent",agentRouter);
// app.use("/ticket",ticketRouter);
app.use("/customer",customer)


app.get("/hello",(req,res)=>{
    console.log(req.query);
    res.send("hello");
})

app.post("/api/payment/verify",(req,res)=>{
    console.log(req.body);
    res.status(200).json("working well payment verification")
})