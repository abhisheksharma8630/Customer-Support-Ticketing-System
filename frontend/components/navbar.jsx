
import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
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
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark sticky-top" id="nav-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="" id="nav-ease">
          <img
            src="/vite.svg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-center me-4"
          />
          Ticket Ease
        </a>
        <button
          className="navbar-toggler btn btn-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon btn btn-light"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <a href="/#features" className="navbar-brand text-light">
                Home
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <a href="/dashboard" className="navbar-brand text-light">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a href="/ticket" className="navbar-brand text-light">
                    Raise Ticket
                  </a>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex ms-3">
            {isLoggedIn ? (
              <button onClick={logout} className="btn btn-outline-danger me-4">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-info me-4" type="submit">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-outline-light" type="submit">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

//     <div className='navbar_create'>
//       <div className='navbar_left'>
//           <h1><a href="/">Ticket Ease</a></h1>
//       </div>
//         <div className='navbar_right'>
//           <ul style={{display:"flex",gap:"2rem",alignItems:"center"}}>
//             {loggedInStatus && <a href='/dashboard'>Dashboard</a>}
//             {role === "admin" && <a href='/add-agent'>Add Agent</a>}
//             {!loggedInStatus && <a href='/login'>Login</a>}
//             <a href='/ticket'>Raise Ticket</a>
//             {loggedInStatus && <button onClick={logout}>Logout</button >}