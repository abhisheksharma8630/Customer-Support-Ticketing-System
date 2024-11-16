import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        default:"password"
    },
    role: {
        type: String,
        enum: ['customer', 'agent', 'admin'],
        default:"customer",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        expires: 3600, 
    },
});

export const User = mongoose.model('User', userSchema);


const customerSchema = new mongoose.Schema({
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
        },
    ],
});

export const Customer = User.discriminator('Customer', customerSchema);


const agentSchema = new mongoose.Schema({
    assignedTickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
        },
    ],
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

export const Agent = User.discriminator('Agent', agentSchema);

