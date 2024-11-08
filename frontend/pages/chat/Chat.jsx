import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'

export default function Chat() {

  const [ticket,setTicket] = useState({
    title: '',
    description: '',
    category: 'general'
  })

  const handleChange=(e)=>{
    setTicket({...ticket,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/ticket',ticket,{
        headers:{
          Authorization:`Bearer ${Cookies.get('accessToken')}`
        }
      });
      alert(response.data.message);
    }catch(error){
      if(error){
        alert(error.response.data.message);
      }
    }
  }
  return (
    <div className='container'>
      <div className='ticket_raise_form'>
        <form action="" onSubmit={handleSubmit}>
          <h2><b>Raise your ticket here!</b></h2>
          <br />
          <label htmlFor="usrname">UserName : </label>
          <input placeholder='Enter your username...' type="text" id='usrname' name='usrname' value={ticket.usrname} onChange={handleChange}/>
          <br />
          <br/>
          <label htmlFor="usremail">Email : </label>
          <input placeholder='Enter your email...' type="email" id='email' name='email' value={ticket.email} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor="title">Title : </label>
          <input placeholder='Enter title...' type="text" id='title' name='title' value={ticket.title} onChange={handleChange}/> 
          <br />
          <br />
          <label htmlFor="description">Description : </label> 
          <br />
          <textarea placeholder='Write your ticket here...' name="description" id="description" value={ticket.description} onChange={handleChange}></textarea>
          <br />
          <br />
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={ticket.category} onChange={handleChange}>
            <option value="technical">technical</option>
            <option value="billing">billing</option>
            <option value="general">general</option>
            <option value="account">account</option>
            <option value="other">other</option>
          </select>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
