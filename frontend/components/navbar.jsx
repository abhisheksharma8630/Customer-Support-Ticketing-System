import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = async () => {
    Cookies.remove('accessToken');
    navigate('/login');
  }
  return (
    <div>
        <nav>
          <ul style={{display:"flex",gap:"1rem"}}>
            <a href='/dashboard'>Dashboard</a>
            <a href='/login'>Login</a>
            <a href='/signup'>Signup</a>
            <a href='/ticket'>Raise Ticket</a>
            <button onClick={logout}>Logout</button >
          </ul>
        </nav>
    </div>
  )
}
