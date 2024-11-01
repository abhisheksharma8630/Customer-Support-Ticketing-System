import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chat from '../pages/chat/Chat'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/signup.jsx'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from '../pages/dashboard/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat/>,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
