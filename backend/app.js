import express, { urlencoded } from 'express';
import 'dotenv/config'
import dbconnect from './utils/dbconnect.js';
import userRouter from './routes/user.route.js'
import ticketRouter from './routes/ticket.route.js';
import cookieParser from 'cookie-parser'


const app = express();
dbconnect().then(()=>console.log("Db connected")).catch(err=>console.log(err))


app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(cookieParser());

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})

app.use("/user",userRouter);
app.use("/ticket",ticketRouter);