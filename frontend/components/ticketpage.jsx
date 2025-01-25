import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OTPInput from "./otpInput";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Alert } from "@mui/material";

const TicketDisplay = ({ ticketId, userType = "agent" }) => {
  const [ticket, setTicket] = useState({
    title: "Ticket_Title",
    description: "Ticket_description",
    status: "open",
  });
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState("");

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketId}`
      );
      setTicket(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
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
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketId}`,
        {
          status,
          updatedBy: userId,
          notes,
        }
      );
      fetchTicket();
      setNotes("");
      setStatus("");
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTicketOtp = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/close/${ticketId}`
      );
      if (response.status === 200) {
        setOtpSend(true);
        alert("OTP sent successfully");
      }
    } catch (error) {
      alert("Error while sending OTP");
      console.error(error);
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
      if (response.status === 200) {
        fetchTicket();
        alert("Ticket Closed Successfully");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Card variant="outlined" sx={{ maxWidth: 600, mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Ticket Details
          </Typography>
          <Typography variant="body1">
            <strong>Subject:</strong> {ticket.title}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {ticket.description}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {ticket.status}
          </Typography>
          <Typography variant="body1">
            <strong>Assigned Agent:</strong> {ticket?.agent?.name || "Unassigned"}
          </Typography>
          <Divider sx={{ my: 2 }} />
          {ticket.status !== "closed" && (
            !otpSend ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseTicketOtp}
              >
                {!otpSend ? "Close this Ticket" : "Resend OTP"}
              </Button>
            ) : (
              <Box>
                <Typography variant="body2" gutterBottom>
                  Enter Client OTP to close the ticket:
                </Typography>
                <form onSubmit={handleOtpSubmit}>
                  <OTPInput
                    length={6}
                    onChange={(enteredOtp) => setOtp(enteredOtp.join(""))}
                  />
                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                  </Button>
                </form>
              </Box>
            )
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            History
          </Typography>
          {ticket?.history?.length > 0 ? (
            ticket.history.map((entry, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body2">
                  <strong>Status:</strong> {entry.status}
                </Typography>
                <Typography variant="body2">
                  <strong>Updated By:</strong> {entry.updatedBy.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Notes:</strong> {entry.notes}
                </Typography>
                <Typography variant="caption">
                  {new Date(entry.timestamp).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          ) : (
            <Alert severity="info">No history available.</Alert>
          )}
        </CardContent>
        {userType === "agent" && ticket.status !== "closed" && (
          <CardActions>
            <Box width="100%">
              <Typography variant="h6">Update Ticket Status</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="on-hold">On Hold</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Notes"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleStatusUpdate}
                disabled={loading}
              >
                Update Status
              </Button>
            </Box>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default TicketDisplay;
