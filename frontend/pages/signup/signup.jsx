import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export default function signup({role = "customer"}) {
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: role,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, user);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      if(error){
        alert(error.response.data.error);
      }
    }

  };
  const handleClick = () => {
    const passw = document.querySelector('#password');
    if(passw.value!=''){
    if (passw.type === 'password') {
        passw.type = 'text';
    } else {
        passw.type = 'password';
    }
  }
};


  return (
    <div className="login_container">
      <div className="login_left">
        <img
          src="https://img.freepik.com/premium-photo/customer-support-team-providing-assistance-from-modern-call-center-daytime-hours_1143476-3349.jpg?semt=ais_hybrid"
          className="slider"
          alt=""
        />
      </div>
      <div className="login_right">
        <form
          action=""
          onSubmit={handleSubmit}
          id="signup-form"
          className="form"
        >
          <h2>Sign Up</h2>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <br />
          <button type="submit" id="signup-btn" className="btn-login">
            Submit
          </button>
        </form>




<div className="signup-container">
<div className="signup-child">
    <div className="signup-left">
    </div>
    <div className="signup-right">
          <div className="signup-part">
        <h2>Create your account</h2>
        <form className="signup-form"  action="" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name:</label>
            <br/>
            <div className="signup-fullname">
                <label htmlFor="name"><i className="fa-solid fa-user"></i></label>
                <input type="text" id="name" placeholder="Full Name" name="name" value={user.name} onChange={handleChange} required/>
            </div>
            <label htmlFor="email">Email:</label>
            <br/>
            <div className="signup-email">
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
                <input type="email" id="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} required/>
            </div>
            <label htmlFor="Role">Role:</label>
            <br/>
            <div className="signup-role">
                <label htmlFor="role"><img src="https://www.shutterstock.com/image-vector/management-roles-icon-line-vector-260nw-2427069073.jpg" alt=""/></label>
                <select name="role" id="role" value={user.role} onChange={handleChange}>
                    <option value="customer">Customer</option>
                    <option value="agent">Agent</option>
                </select>
            </div>
            
            <label htmlFor="pass">Password:</label>
            <br/>
            <div className="signup-pass">
           <label htmlFor="pass"><i className="fa-solid fa-lock"></i></label>
            <input type="password" id="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required/>
            <i className="fa-solid fa-eye" onClick={handleClick}></i>
            </div>
            <button type="submit" id="signup-btn">Create Account</button>
        </form>
        <div className="signup_last">
            <p>
              Already have an acount?
              <a href="/login" id="signup-link" className="toggle-btn">
                Login
              </a>
            </p>
          </div>
          </div>
</div>
</div>
</div>
  );
}
