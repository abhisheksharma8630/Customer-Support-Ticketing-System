import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OTPInput } from "../../components/otpInput";
import axios from "axios";
const RaiseTicket = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
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
                    <button className="btn btn-primary rounded" onClick={handleSendOtp} disabled={loading}>
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
                    <button className="btn btn-primary mt-2" onClick={handleVerifyOtp}>Verify OTP</button>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                </div>
                <br />
                <div className="input-group">
                  <label>Category:</label>
                  <br />
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category"
                    required
                  />
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
                    required
                  ></textarea>
                </div>
                <br />
                <button className="raise-button" type="submit">
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
