import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const [tickets,setTickets] = useState([
    {
      title: 'learning German While you Sleep or Rest',        
      description: 'gello asdfa',
      customer: {
        name: 'abhishek',
        email: 'abhishek@gmail.com',
        role: 'customer',
        createdAt: "2024-10-29T19:25:51.162Z",
        __v: 0
      },
      status: 'open',
      priority: 'medium',
      category: 'general',
      createdAt: "2024-10-30T17:14:01.685Z",
      updatedAt: "2024-10-30T17:14:01.686Z",
      attachments: [],
      comments: [],
      history: [],
      __v: 0
    }
  ]);
  const fetchTickets = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket`);
    setTickets(response.data);
  }
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };
  useEffect(()=>{
    fetchTickets();
  },[])
  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0" style={{width:"100%",borderCollapse:'collapse'}}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Customer Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Category</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td>{truncateText(ticket.title, 25)}</td>
            <td>{truncateText(ticket.description, 30)}</td>
            <td>{ticket.customer.name}</td>
            <td>{ticket.customer.email}</td>
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
            <td>{ticket.category}</td>
            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
            <td>{new Date(ticket.updatedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
