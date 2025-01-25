import razorpay from 'razorpay';
import { validatePaymentVerification,validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';

export const createCustomer = async (req,res)=>{
    console.log(req.body);
    return res.status(200).send("Everying working fine");
}
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

export const makePayment = async (req,res)=>{
    const order = await razorpayInstance.orders.create({amount:req.body.amount,currency:"INR"});
    res.status(200).json(order);
}

export const verifyPayment = async(req,res)=>{
    console.log("Let verifyPayment");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    const isAuthentic = expectedSignature == razorpay_signature;
    if (isAuthentic) {
        res.status(200).json("Subscribed Successfully");
    } else {
        res.status(400).json('error while subscription');
    }
}