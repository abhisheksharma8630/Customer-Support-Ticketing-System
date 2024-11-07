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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id='title' name='title' value={ticket.title} onChange={handleChange}/> <br />
        <label htmlFor="description">Description</label> <br />
        <input type="text" id='description' name='description' value={ticket.description} onChange={handleChange}/> <br />
        <label htmlFor="category">Category</label> <br />
        <select name="category" id="category" value={ticket.category} onChange={handleChange}>
          <option value="technical">technical</option>
          <option value="billing">billing</option>
          <option value="general">general</option>
          <option value="account">account</option>
          <option value="other">other</option>
        </select> <br />
        <button>Submit</button>
      </form>
    </div>
  )
}
