import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { OTPInput } from "./otpInput";

const TicketDisplay = ({ ticketId, userType = "agent" }) => {
  const [ticket, setTicket] = useState({
    title:"Ticket_Title",
    description:"Ticket_description",
    status:"open"
  });
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState("");


  const fetchTicket = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketId}`
      );
      console.log(response);
      setTicket(response.data);
      setStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const handleStatusUpdate = async () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      console.error("User not authenticated");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketId}`,
        {
          status,
          updatedBy: userId, // Replace with actual agent ID in production
          notes,
        }
      );
      fetchTicket();
      setLoading(false);
      setNotes(""); // Reset notes input
      setStatus("");
    } catch (error) {
      setLoading(false);
      console.error("Error updating ticket:", error);
    }
  };

  const handleCloseTicketOtp = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/close/${ticketId}`
      );
      if (response.status == 200) {
        setOtpSend(true);
        alert("otp send successfully");
      }
    } catch (error) {
      alert("error while Sending otp");
      console.log(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/close/${ticketId}`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      if (response.status == 200) {
        fetchTicket();
        alert("Ticket Closed Successfully");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="ticket-container">
      <h2>Ticket Details</h2>
      <p>
        <strong>Subject:</strong> {ticket.title}
      </p>
      <p>
        <strong>Description:</strong> {ticket.description}
      </p>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Assigned Agent:</strong> {ticket?.agent?.name || "Unassigned"}
      </p>
      {ticket.status != "closed" && (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCloseTicketOtp}
        >
          {!otpSend ? "Close this ticket" : "Resend Otp"}
        </button>
      )}
      {otpSend && (
        <div>
          Enter Client OTP to close Ticket{" "}
          <form action="" onSubmit={handleOtpSubmit}>
            <OTPInput
              length={6} // Define OTP length
              onChange={(enteredOtp) => setOtp(enteredOtp.join(""))} // Collect the OTP as a string
            />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
      <h3>History</h3>
      <div className="history-list">
        {ticket?.history?.map((entry, index) => (
          <div key={index} className="history-item">
            <p>
              <strong>Status:</strong> {entry.status}
            </p>
            <p>
              <strong>Updated By:</strong> {entry.updatedBy.name}
            </p>
            <p>
              <strong>Notes:</strong> {entry.notes}
            </p>
            <p>
              <small>{new Date(entry.timestamp).toLocaleString()}</small>
            </p>
          </div>
        ))}
      </div>

      {/* Agent controls */}
      {userType === "agent" && ticket.status !== "closed" && (
        <div className="agent-controls">
          <h3>Update Ticket Status</h3>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="on-hold">On Hold</option>
          </select>

          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about the update..."
          ></textarea>

          <button onClick={handleStatusUpdate} disabled={loading}>Update Status</button>
        </div>
      )}
    </div>
  );
};

export default TicketDisplay;
