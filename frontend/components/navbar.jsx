import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the accessToken cookie
    const token = Cookies.get('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const logout = async () => {
    Cookies.remove('accessToken');
    setIsLoggedIn(false);
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



// <div class="collapse navbar-collapse" id="navbarScroll">
//       <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Link</a>
//         </li>
//         <li class="nav-item dropdown">
//           <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Link
//           </a>
//           <ul class="dropdown-menu">
//             <li><a class="dropdown-item" href="#">Action</a></li>
//             <li><a class="dropdown-item" href="#">Another action</a></li>
//             <li><hr class="dropdown-divider"></li>
//             <li><a class="dropdown-item" href="#">Something else here</a></li>
//           </ul>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link disabled" aria-disabled="true">Link</a>
//         </li>
//       </ul>
//       <form class="d-flex" role="search">
//         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
//         <button class="btn btn-outline-success" type="submit">Search</button>
//       </form>
//     </div>
   // <div className='navbar_create'>
    //   <div className='navbar_left'>
    //       <h1>Ticket Ease</h1>
    //   </div>
    //     <div className='navbar_right'>
    //       <ul style={{display:"flex",gap:"1.2rem",alignItems:"center"}}>
    //         <a href='/dashboard'>Dashboard</a>
    //         <a href='/login' id='nav_login'>Login</a>
    //         <a href='/signup' id='nav_signup'>Signup</a>
    //         <a href='/ticket'>Raise Ticket</a>
    //         <button onClick={logout}>Logout</button >
    //       </ul>
    //     </div>

    // </div>