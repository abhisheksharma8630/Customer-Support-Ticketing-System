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
    setTickets(response.data);
  }

  useEffect(()=>{
    fetchTickets("");
  },[])
  return (
    <div>
      <div>
        <button onClick={()=>fetchTickets("")}>All</button>
        <button onClick={()=>fetchTickets("?status=open")}>Open</button>
        <button onClick={()=>fetchTickets("?status=resolved")}>Resolved</button>        
      </div>
      {role === 'agent' && <AgentDashboard tickets={tickets}/>}
      {role === 'admin' && <AdminDashboard tickets={tickets} />}
      {role === 'customer' && <CustomerDashboard tickets={tickets} />}
      {/* Add your other dashboard components here */}
    </div>
  )
}
