import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        login
      );
      console.log(response);
      if (response.status === 200) {
        alert("Login Successful");
        Cookies.set("accessToken", response.data.token);
        Cookies.set("userId", response.data.user._id);
        Cookies.set("role", response.data.user.role);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error) {
        alert(error.response.data.message);
      }
    }
  };
  const handleClick = () => {
    const passw = document.querySelector("#password");
    if (passw.type != "") {
      if (passw.type === "password") {
        passw.type = "text";
      } else {
        passw.type = "password";
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-child">
        <div className="login-left"></div>
        <div className="login-right">
          <div className="login-part">
            <h2>Hi! Welcome to</h2>
            <h2>Ticket Ease</h2>
            <form className="login-form" action="" onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <br />
              <div className="login-email">
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="pass">Password:</label>
              <br />
              <div className="login-pass">
                <label htmlFor="pass">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                />
                <i className="fa-solid fa-eye" onClick={handleClick}></i>
              </div>
              <button type="submit" id="login-btn">
                Login
              </button>
            </form>
            <div className="login_last">
              <p>
                Don't have an acount?
                <a href="/signup" id="login-link" className="toggle-btn">
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
