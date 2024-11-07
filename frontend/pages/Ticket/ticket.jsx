import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketPage = ({ userRole }) => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    "_id": "634123abcde456fgh7890ijk",
    "title": "Cannot access account",
    "description": "I am unable to log into my account despite multiple attempts.",
    "customer": {
      "_id": "601234abcde456fgh7890xyz",
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "agent": {
      "_id": "601234abcde456fgh7890uvw",
      "name": "Jane Smith",
      "email": "janesmith@example.com"
    },
    "status": "in-progress",
    "priority": "high",
    "createdAt": "2023-10-25T10:00:00.000Z",
    "updatedAt": "2023-10-27T15:30:00.000Z",
    "category": "account",
    "attachments": [
      {
        "fileUrl": "https://example.com/attachment1.png",
        "fileType": "screenshot",
        "uploadedAt": "2023-10-25T12:00:00.000Z"
      },
      {
        "fileUrl": "https://example.com/attachment2.png",
        "fileType": "error log",
        "uploadedAt": "2023-10-25T12:05:00.000Z"
      }
    ],
    "comments": [
      {
        "user": {
          "_id": "601234abcde456fgh7890xyz",
          "name": "John Doe"
        },
        "message": "I still cannot log in, even after resetting my password.",
        "timestamp": "2023-10-26T08:30:00.000Z"
      },
      {
        "user": {
          "_id": "601234abcde456fgh7890uvw",
          "name": "Jane Smith"
        },
        "message": "I’ve escalated this issue to our technical team for further investigation.",
        "timestamp": "2023-10-26T09:45:00.000Z"
      }
    ],
    "history": [
      {
        "status": "open",
        "timestamp": "2023-10-25T10:00:00.000Z",
        "updatedBy": {
          "_id": "601234abcde456fgh7890uvw",
          "name": "Jane Smith"
        },
        "notes": "Ticket created and assigned to agent."
      },
      {
        "status": "in-progress",
        "timestamp": "2023-10-26T09:00:00.000Z",
        "updatedBy": {
          "_id": "601234abcde456fgh7890uvw",
          "name": "Jane Smith"
        },
        "notes": "Customer unable to access account; further investigation required."
      }
    ]
  }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket/${id}`);
        console.log(response)
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>No ticket found.</p>;

  return (
    <div className="ticket-page">
      <h1>Ticket: {ticket.title}</h1>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Category:</strong> {ticket.category}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
      {ticket.updatedAt && (
        <p><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
      )}

      {/* Show Customer and Agent Details */}
      <div className="user-info">
        <p><strong>Customer:</strong> {ticket.customer?.name || 'N/A'}</p>
        {ticket.agent && <p><strong>Agent:</strong> {ticket.agent.name}</p>}
      </div>

      {/* Attachments */}
      {/* {ticket.attachments.length > 0 && (
        <div className="attachments">
          <h2>Attachments</h2>
          <ul>
            {ticket.attachments.map((attachment, index) => (
              <li key={index}>
                <a href={attachment.fileUrl} target="_blank" rel="noopener noreferrer">
                  {attachment.fileType}
                </a> - {new Date(attachment.uploadedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Comments Section */}
      {/* <div className="comments">
        <h2>Comments</h2>
        <ul>
          {ticket.comments.map((comment, index) => (
            <li key={index}>
              <p><strong>{comment.user?.name}:</strong> {comment.message}</p>
              <p><em>{new Date(comment.timestamp).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      </div> */}

      {/* History Section */}
      {/* {userRole === 'admin' && ticket.history.length > 0 && (
        <div className="history">
          <h2>Ticket History</h2>
          <ul>
            {ticket.history.map((event, index) => (
              <li key={index}>
                <p><strong>Status:</strong> {event.status}</p>
                <p><strong>Updated By:</strong> {event.updatedBy?.name || 'N/A'}</p>
                <p><em>{new Date(event.timestamp).toLocaleString()}</em></p>
                {event.notes && <p><strong>Notes:</strong> {event.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default TicketPage;
