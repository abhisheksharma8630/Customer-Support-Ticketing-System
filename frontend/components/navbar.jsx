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
    <div className='navbar_create'>
      <div className='navbar_left'>
          <h1>Ticket Ease</h1>
      </div>
        <div className='navbar_right'>
          <ul style={{display:"flex",gap:"1.2rem",alignItems:"center"}}>
            <a href='/dashboard'>Dashboard</a>
            <a href='/login' id='nav_login'>Login</a>
            <a href='/signup' id='nav_signup'>Signup</a>
            <a href='/ticket'>Raise Ticket</a>
            <button onClick={logout}>Logout</button >
          </ul>
        </div>

    </div>
  )
}
