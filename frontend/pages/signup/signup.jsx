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
  return (
    <div>
        {JSON.stringify(user)}
        <form action="" onSubmit={handleSubmit}>
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
        </form>
    </div>
  )
}
