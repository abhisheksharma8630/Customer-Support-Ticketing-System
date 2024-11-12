import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketDisplay = ({ ticketId, userType }) => {
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketId}`);
        console.log(response)
        setTicket(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.put(`/ticket/${ticketId}`, {
        status,
        updatedBy: 'agentId', // Replace with actual agent ID in production
        notes,
      });
      setTicket(response.data.ticket);
      setNotes(''); // Reset notes input
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="ticket-container">
      <h2>Ticket Details</h2>
      <p><strong>Subject:</strong> {ticket.title}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Assigned Agent:</strong> {ticket?.agent?.name || 'Unassigned'}</p>

      <h3>History</h3>
      <div className="history-list">
        {ticket?.history.map((entry, index) => (
          <div key={index} className="history-item">
            <p><strong>Status:</strong> {entry.status}</p>
            <p><strong>Updated By:</strong> {entry.updatedBy.name}</p>
            <p><strong>Notes:</strong> {entry.notes}</p>
            <p><small>{new Date(entry.timestamp).toLocaleString()}</small></p>
          </div>
        ))}
      </div>

      {/* Agent controls */}
      {userType === 'agent' && ticket.status === 'closed' && (
        <div className="agent-controls">
          <h3>Update Ticket Status</h3>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            <option value="on-hold">On Hold</option>
          </select>

          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about the update..."
          ></textarea>

          <button onClick={handleStatusUpdate}>Update Status</button>
        </div>
      )}
    </div>
  );
};

export default TicketDisplay;

