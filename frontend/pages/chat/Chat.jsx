// import React, { useState } from 'react'
// import axios from 'axios';
// import Cookies from 'js-cookie'

// export default function Chat() {

//   const [ticket,setTicket] = useState({
//     title: '',
//     description: '',
//     category: 'general'
//   })

//   const handleChange=(e)=>{
//     setTicket({...ticket,[e.target.name]:e.target.value});
//   }

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     try{
//       const response = await axios.post('http://localhost:8000/ticket',ticket,{
//         headers:{
//           Authorization:`Bearer ${Cookies.get('accessToken')}`
//         }
//       });
//       alert(response.data.message);
//     }catch(error){
//       if(error){
//         alert(error.response.data.message);
//       }
//     }
//   }
//   return (
//     <div>
//       <form action="" onSubmit={handleSubmit}>
//         <label htmlFor="title">Title</label> <br />
//         <input type="text" id='title' name='title' value={ticket.title} onChange={handleChange}/> <br />
//         <label htmlFor="description">Description</label> <br />
//         <input type="text" id='description' name='description' value={ticket.description} onChange={handleChange}/> <br />
//         <label htmlFor="category">Category</label> <br />
//         <select name="category" id="category" value={ticket.category} onChange={handleChange}>
//           <option value="technical">technical</option>
//           <option value="billing">billing</option>
//           <option value="general">general</option>
//           <option value="account">account</option>
//           <option value="other">other</option>
//         </select> <br />
//         <button>Submit</button>
//       </form>
//     </div>
//   )
// }

import React, { useState } from 'react';
import axios from 'axios';
const RaiseTicket = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async () => {
    try {
      setError('');
      setSuccess('');
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/send-otp`, { email });
      setOtpSent(true);
      setSuccess(response.data.message);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError('');
      setSuccess('');
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`, { email, otp });
      if (response.status === 200) {
        setOtpVerified(true);
        setSuccess('OTP verified successfully!');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit title, description, and category to your backend here
    // Example:
    // await axios.post('/api/submit-form', { email, title, description, category });
    alert('Form submitted!');
  };

  return (
    <div className="form-container">
      <h2>Email Verification Form</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {!otpSent && (
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}

      {otpSent && !otpVerified && (
        <div className="input-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            required
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {otpVerified && (
        <form onSubmit={handleSubmit} className="details-form">
          <div className="input-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="input-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default RaiseTicket;
