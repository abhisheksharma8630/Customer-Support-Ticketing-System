import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import AgentDashboard from '../../components/agentDashboard'
import CustomerDashboard from '../../components/customerDashboard';
import AdminDashboard from '../../components/adminDashboard';

export default function Dashboard() {
  const role = Cookies.get("role");
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
  const fetchTickets = async(status)=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket/${status}`,{headers:{
      Authorization:`Bearer ${Cookies.get('accessToken')}`
    }});
    console.log(response);
    setTickets(response.data);
  }

  const updateTicketAgent = (ticketId, agentId) => {
    fetchTickets("");
  };

  useEffect(()=>{
    fetchTickets("");
  },[])
  return (
    <div>
      <div className='d-flex'>
        <button className='btn btn-sm btn-primary m-2'  onClick={()=>fetchTickets("")}>All</button>
        <button className='btn btn-sm btn-primary m-2' onClick={()=>fetchTickets("?status=open")}>Open</button>
        <button className='btn btn-sm btn-primary m-2' onClick={()=>fetchTickets("?status=resolved")}>Resolved</button>        
        <button className='btn btn-sm btn-primary m-2' onClick={()=>fetchTickets("?status=closed")}>Closed</button>        
        <button className='btn btn-sm btn-primary m-2' onClick={()=>fetchTickets("?status=in-progress")}>In-Progress</button>        
        <button className='btn btn-sm btn-primary m-2' onClick={()=>fetchTickets("?status=on-hold")}>On-Hold</button>        
      </div>
      {role === 'agent' && <AgentDashboard tickets={tickets}/>}
      {role === 'admin' && <AdminDashboard tickets={tickets} updateTicketAgent={updateTicketAgent}/>}
      {role === 'customer' && <CustomerDashboard tickets={tickets} />}
      {/* Add your other dashboard components here */}
    </div>
  )
}
