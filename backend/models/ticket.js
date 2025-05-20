import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent', 
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed', 'on-hold'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  category: {
    type: String,
    enum: ['technical', 'billing', 'general', 'account', 'other'],
    default: 'general',
  },
  attachments: [ 
    {
      fileUrl: String,
      fileType: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  history: [
    {
      status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved', 'closed', 'on-hold'],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      notes: String,
    },
  ],
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
