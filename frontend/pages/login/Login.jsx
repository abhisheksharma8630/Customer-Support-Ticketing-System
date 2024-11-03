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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label> <br />
        <input type="text" id='email' name='email' value={login.email} onChange={handleChange}/> <br />
        <label htmlFor="password" >Password</label> <br />
        <input type="text" id='password' name='password' value={login.password} onChange={handleChange}/> <br />
        <button>Submit</button>
      </form>
    </div>
  )
}
