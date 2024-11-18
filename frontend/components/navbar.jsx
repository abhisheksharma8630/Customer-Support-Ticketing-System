import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Navbar() {
  const [loggedInStatus,setLoggedInStatus] = useState('false');
  const role = Cookies.get('role');
  const navigate = useNavigate();
  const accessToken = Cookies.get('accessToken'); // Get the access token from the cookie

  useEffect(() => {
    const verifyToken = async () => {
      if (!accessToken) {
        setLoggedInStatus(false);
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verify-token`, {
          accessToken,
        });
        console.log(response)
        if (response.status === 200) {
          Cookies.set("role",response.data.role);
          setLoggedInStatus(true);
        } else {
          setLoggedInStatus(false);
        }
      } catch (error) {
        console.log(error)
        setLoggedInStatus(false);
      }
    };

    verifyToken();
  }, [accessToken]);

  const logout = async () => {
    Cookies.remove('accessToken');
    Cookies.remove('role');
    Cookies.remove('userId');
    navigate('/login');
  }
  return (
    <div className='navbar_create'>
      <div className='navbar_left'>
          <h1><a href="/">Ticket Ease</a></h1>
      </div>
        <div className='navbar_right'>
          <ul style={{display:"flex",gap:"2rem",alignItems:"center"}}>
            {loggedInStatus && <a href='/dashboard'>Dashboard</a>}
            {role === "admin" && <a href='/add-agent'>Add Agent</a>}
            {!loggedInStatus && <a href='/login'>Login</a>}
            <a href='/ticket'>Raise Ticket</a>
            {loggedInStatus && <button onClick={logout}>Logout</button >}
          </ul>
        </div>

    </div>
  )
}
