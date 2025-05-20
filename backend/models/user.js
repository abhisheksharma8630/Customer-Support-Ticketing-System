import mongoose from "mongoose";


// User for TicketEase

const actualCustomerSchema = new mongoose.Schema({
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
        default: "password"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subscribed:{
        type:Boolean,
        default:false
    }
});

export const ActualCustomer = mongoose.model('ActualCustomer', actualCustomerSchema);

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
        default: "password"
    },
    role: {
        type: String,
        enum: ['customer', 'agent', 'admin'],
        default: "customer",
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


const agentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        profilePicture: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: 'agent',
        },
        permissions: {
            type: [String],
            default: ['view_tickets'],
        },
        department: {
            type: String,
            enum: ['technical', 'billing', 'general inquiries'],
            default: 'technical',
        },
        assignedTickets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ticket',
            },
        ],
        resolvedTickets: {
            type: Number,
            default: 0,
        },
        activeStatus: {
            type: Boolean,
            default: true,
        },
        dateOfJoining: {
            type: Date,
            default: Date.now,
        },
        lastLogin: {
            type: Date,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            default: null,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            default: null,
        },
        shifts: [
            {
                day: {
                    type: String,
                    enum: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ],
                },
                startTime: {
                    type: String,
                },
                endTime: {
                    type: String,
                },
            },
        ],
        languages: {
            type: [String],
            default: ['English'],
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        notes: [
            {
                date: {
                    type: Date,
                    default: Date.now,
                },
                content: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

export const Agent = mongoose.model('Agent', agentSchema);

