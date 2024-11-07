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
    try{

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,login);
      console.log(response);
      if(response.status === 200){
        alert('Login Successful')
        Cookies.set('accessToken',response.data.token);
        navigate("/dashboard");
      }
    }catch(error){
      if(error){
        alert(error.response.data.message);
      }
    }
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
      <div className="login_left">
            
                <img src="https://img.freepik.com/premium-vector/customer-service-representative-working-laptop-with-headset_1305385-80877.jpg" className="slider" alt=""/>
                {/* <img src="https://media.istockphoto.com/id/1366023601/photo/cropped-shot-of-an-attractive-young-female-call-center-agent-working-in-her-office.jpg?s=612x612&w=0&k=20&c=qvv5Fnh0eE5S0n8ARf0ZTqfFPGSs-nX41xnGsABfOZg=" className="slider" alt=""/> */}
                {/* <img src="https://img.freepik.com/premium-photo/customer-support-team-providing-assistance-from-modern-call-center-daytime-hours_1143476-3349.jpg?semt=ais_hybrid" className="slider" alt=""/> */}
            
        </div>
        <div className="login_right">
           
            <form id="login-form" className="form " onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">Email</label> <br />
              <input type="text" id='email' name='email' value={login.email} placeholder="Email" onChange={handleChange} className="login-email"/> <br />
              <label htmlFor="password" >Password</label> <br />
              <input type="text" id='password' name='password' value={login.password}  placeholder="Password" onChange={handleChange} className="login-pass"/> <br />
              <button className="btn-login">Login</button>
            </form>
            <div className="login_last">
              <p>Do not have any account? <a href='/signup' id="signup-btn" className="toggle-btn">Sign Up</a></p>
            </div>
        </div>

    </div>
  )
}
