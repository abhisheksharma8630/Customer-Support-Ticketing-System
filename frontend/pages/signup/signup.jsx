import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function signup() {
    const[user,setUser]= useState({
        name:'',
        email:'',
        password:'',
        role:'customer'
    })

    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,user);
        console.log(response)
    }

    const handleClick = () => {
        const passw = document.querySelector('#password');
        if (passw.type === 'password') {
            passw.type = 'text';
        } else {
            passw.type = 'password';
        }
    };
    
    
  return (
    <div className='login_container'>
        {/* {JSON.stringify(user)} */}
        {/* <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label><br/>
            <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required/><br/>
            <label htmlFor="email">Email:</label><br/>
            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required/><br/>
            <label htmlFor="password">Password:</label><br/>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required/><br/>
            <label htmlFor="role">Role</label>
            <select name="role" id="role" value={user.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
            </select><br />
            <button type='submit'>Submit</button>
        </form> */}
        <div class="login_left">
          
          {/* <img src="https://img.freepik.com/premium-vector/customer-service-representative-working-laptop-with-headset_1305385-80877.jpg" class="slider" alt=""> */}
          {/* <img src="https://media.istockphoto.com/id/1366023601/photo/cropped-shot-of-an-attractive-young-female-call-center-agent-working-in-her-office.jpg?s=612x612&w=0&k=20&c=qvv5Fnh0eE5S0n8ARf0ZTqfFPGSs-nX41xnGsABfOZg=" class="slider" alt=""> */}
          <img src="https://img.freepik.com/premium-photo/customer-support-team-providing-assistance-from-modern-call-center-daytime-hours_1143476-3349.jpg?semt=ais_hybrid" class="slider" alt=""/>
      
        </div>
     <div class="login_right">
      {/* <div class="login_btn">
          
          <button id="signup-btn" class="toggle-btn">Sign Up</button>
      </div> */}
    
          <form action="" onSubmit={handleSubmit} id="signup-form" class="form">
              <h2>Sign Up</h2>
              <label htmlFor="name">Name:</label><br/>
              <input type="text" id="name" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" required/><br/>
              <label htmlFor="email">Email:</label><br/>
              <input type="email" id="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required/><br/>
              <label htmlFor="password">Password:</label><br/>
              <input type="password" id="password" name="password" value={user.password} onChange={handleChange} placeholder="Password"  required/>
              <img src="https://www.svgrepo.com/show/302445/eye.svg" alt="show pass" id='show_pass' onClick={handleClick}/>
              <br/>
             
              <label htmlFor="role">Role:</label>
              <select name="role" id="role" value={user.role} onChange={handleChange} >
                  <option value="customer" >Customer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
              </select><br />
              <button type='submit' id="signup-btn" class="btn-login">Submit</button>
          </form>

          <div className="login_last">
              <p>Already have an acount? <a href='/login' id="login-btn" class="toggle-btn">Login</a></p>
            </div>
        </div>
    </div>
  )
}
