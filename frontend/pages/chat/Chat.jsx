import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "../../components/otpInput";
import axios from "axios";
const RaiseTicket = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/send-otp`,
        { email }
      );
      setLoading(false);
      console.log(response);
      setOtpSent(true);
      setSuccess(response.data.message);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`,
        { email, otp }
      );
      if (response.status === 200) {
        setOtpVerified(true);
        setSuccess("OTP verified successfully!");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ticket`,
        { email, title, description, category }
      );
      if (response.status == 201) {
        alert("Ticket Created Successfully");
        navigate("/login");
      }
    } catch (error) {
      alert("Failed to create the Ticket");
      console.log("error: ", error);
    }
  };

  return (
    <div className="verification-container">
      {/* raise ticket form html */}
      <div className="raise-container">
        <div className="ticket-raise-form">
          <div className="ticket-raise-left">
            <h2>Let us help you to know us you queries.</h2>
            <p>
              Our Ticket solving process is quick and easy, taking no more time
              to solve.
            </p>
            <div className="ticke-raise-left-card">
              <p>
                I'm impressed with the result I've seen since starting to use
                this product, I was really simple and helpfull.
              </p>
              <div className="ticket-raise-left-image"></div>
              <h4>Jonas kim</h4>
            </div>
          </div>

          <div className="ticket-raise-right">
            {!otpVerified && (
              <form className="verification-form">
                <h2>Verify your Email here</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="error">{success}</p>}

                {!otpSent && (
                  <div class="row mb-3">
                    <div class="col-sm-10 w-100 p-0 mt-2 mb-2">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary rounded"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      Send OTP
                    </button>
                  </div>
                )}

                {otpSent && !otpVerified && (
                  <div className="">
                    <label>OTP:</label>
                    <OTPInput
                      length={6} // Define OTP length
                      onChange={(enteredOtp) => setOtp(enteredOtp.join(""))} // Collect the OTP as a string
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </form>
            )}
            {otpVerified && (
              <form onSubmit={handleSubmit} className="raise-form">
                <h2>Get started</h2>
                <h4>Raise your ticket here</h4>
                <div className="input-group">
                  <label>Title:</label>
                  <br />
                  <input
                    type="text"
                    className="w-100 m-0 "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                </div>
                <br />
                <div
                  className="input-group"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="category">Category:</label>
                  <select
                    className="form-select rounded w-100"
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="general" selected>
                      General
                    </option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="account">Account</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <br />
                <div className="input-group">
                  <label>Description:</label>
                  <br />
                  <textarea
                    value={description}
                    id="raise-description"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-100 m-0 p-2"
                    required
                  ></textarea>
                </div>
                <br />
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseTicket;

import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Can I have your email address?" },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [step, setStep] = useState("email"); // Tracks the current step

  const categories = ["technical", "billing", "general", "account","other"];

  const toggleChatBox = () => {
    setOpen(!open);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Append user message
    setMessages([...messages, { sender: "user", text: input }]);

    // Handle each step
    if (step === "email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        setEmail(input);

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Thanks! Sending OTP to your email..." },
        ]);

        // Simulate backend OTP request
        await sendOtp(input);

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Please enter the OTP sent to your email." },
        ]);
        setStep("otp");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Hmm, that doesn't look like a valid email. Try again?",
          },
        ]);
      }
    } else if (step === "otp") {
      const isValid = await validateOtp(input);
      if (isValid) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "OTP verified! What's the problem title?" },
        ]);
        setStep("title");
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Invalid OTP. Please try again." },
        ]);
      }
    } else if (step === "title") {
      setTicketData((prev) => ({ ...prev, title: input }));
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it! Please describe the problem." },
      ]);
      setStep("description");
    } else if (step === "description") {
      setTicketData((prev) => ({ ...prev, description: input }));
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Choose a category for your problem." },
      ]);
      setStep("category");
    }

    setInput(""); // Clear input field
  };

  const handleCategorySelect = async (category) => {
    setTicketData((prev) => ({ ...prev, category }));
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: category },
      { sender: "bot", text: "Submitting your ticket..." },
    ]);

    // Simulate ticket submission
    setStep("submitting");
  };

  const sendOtp = async (email) => {
    // Simulate sending OTP
    console.log(`Sending OTP to ${email}`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/send-otp`,
        { email }
      );
    } catch (error) {
      console.log(error);
    }
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const validateOtp = async (otp) => {
    // Simulate OTP validation
    console.log(`Validating OTP: ${otp}`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`,
        { email, otp }
      );
      return response.status == 200
    } catch (error) {
      console.log(error)
    }
  };

  const submitTicket = async () => {
    // Simulate ticket submission
    try {
      console.log(ticketData.category)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ticket`,
        {email,title:ticketData.title,description:ticketData.description,category:ticketData.category}
      );
      console.log(response)
    } catch (error) {
      console.log(error);
    }
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    if (step === "submitting" && ticketData.category) {
      // Only call submitTicket if category has been set
      submitTicket();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Your ticket has been generated successfully!" },
      ]);
      setStep("done"); // Reset step to category after submission
    }
  }, [ticketData, step]);

  return (
    <>
    {JSON.stringify(ticketData)}
       {/* Floating Chat Icon */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <IconButton
          color="primary"
          onClick={toggleChatBox}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <ChatIcon />
        </IconButton>
      </Box>

      {/* Chat Box */}
      {open && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 300,
            height: 400,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              p: 2,
            }}
          >
            <Typography variant="h6">ChatBot</Typography>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              padding: 2,
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor:
                      message.sender === "user" ? "primary.light" : "grey.300",
                    color: message.sender === "user" ? "white" : "black",
                  }}
                >
                  {message.text}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Chat Input */}
          {step !== "category" && step !== "done" && (
            <Box
              sx={{
                display: "flex",
                p: 1,
                borderTop: "1px solid #ddd",
                backgroundColor: "white",
              }}
            >
              <TextField
                placeholder="Type your message..."
                variant="outlined"
                size="small"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Box>
          )}

          {/* Category Selection */}
          {step === "category" && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                p: 2,
                borderTop: "1px solid #ddd",
                backgroundColor: "white",
              }}
            >
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => handleCategorySelect(cat)}
                  sx={{ cursor: "pointer" }}
                  color="primary"
                />
              ))}
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};
