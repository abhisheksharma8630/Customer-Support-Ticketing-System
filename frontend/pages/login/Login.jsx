import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom
  const[login,setLogin]= useState({
    email:'',
    password:'',
})

const handleChange = (e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
}
const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,login);
    if(response.status === 201){
      Cookies.set('accessToken',response.data.token);
      navigate("/dashboard");
    }
    console.log(response);
}
  return (
    <div className='login_container'>
      {/* <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label> <br />
        <input type="text" id='email' name='email' value={login.email} onChange={handleChange}/> <br />
        <label htmlFor="password" >Password</label> <br />
        <input type="text" id='password' name='password' value={login.password} onChange={handleChange}/> <br />
        <button>Submit</button>
      </form> */}
      <div class="login_left">
            
                <img src="https://img.freepik.com/premium-vector/customer-service-representative-working-laptop-with-headset_1305385-80877.jpg" class="slider" alt=""/>
                {/* <img src="https://media.istockphoto.com/id/1366023601/photo/cropped-shot-of-an-attractive-young-female-call-center-agent-working-in-her-office.jpg?s=612x612&w=0&k=20&c=qvv5Fnh0eE5S0n8ARf0ZTqfFPGSs-nX41xnGsABfOZg=" class="slider" alt=""/> */}
                {/* <img src="https://img.freepik.com/premium-photo/customer-support-team-providing-assistance-from-modern-call-center-daytime-hours_1143476-3349.jpg?semt=ais_hybrid" class="slider" alt=""/> */}
            
        </div>
        <div class="login_right">
            {/* <div class="login_btn">
                <button id="login-btn" class="toggle-btn">Login</button>
                
            </div> */}
            {/* <div class="loginUser">
                <button id="user-btn" class="active-btn">User</button>
                <button id="agent-btn" class="active-btn">Agent</button>
            </div> */}
            <form id="login-form" class="form " onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">Email</label> <br />
              <input type="text" id='email' name='email' value={login.email} placeholder="Email" onChange={handleChange} class="login-email"/> <br />
              <label htmlFor="password" >Password</label> <br />
              <input type="password" id='password' name='password' value={login.password}  placeholder="Password" onChange={handleChange} class="login-pass"/> <br />
              <button class="btn-login">Login</button>
            </form>
            <div className="login_last">
              <p>Do not have any account? <a href='/signup' id="signup-btn" class="toggle-btn">Sign Up</a></p>
            </div>
        </div>

    </div>
  )
}
