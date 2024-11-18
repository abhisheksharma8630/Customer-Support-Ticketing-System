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
    } catch (error) {
      if(error){
        alert(error.response.data.error);
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

        <div className="login_last">
          <p>
            Already have an acount?{" "}
            <a href="/login" id="login-btn" className="toggle-btn">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
