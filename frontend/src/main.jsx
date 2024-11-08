import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/signup.jsx'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from '../pages/dashboard/Dashboard.jsx'
import Navbar from '../components/navbar.jsx'
import ProtectedRoute from '../components/protectedRoute.jsx'
import TicketPage from '../pages/Ticket/ticket.jsx'
import RaiseTicket from '../pages/chat/Chat'

const MainLayout = ({children})=>(
  <div>
    <Navbar/>
    {children}
  </div>
)

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout><App/></MainLayout>
  },
  {
    path: "/ticket",
    element: <MainLayout><RaiseTicket/></MainLayout>,
  },
  {
    path:"/ticket/:id",
    element: <ProtectedRoute><MainLayout><TicketPage/></MainLayout></ProtectedRoute>
  },
  {
    path:"/login",
    element:<MainLayout> <Login/></MainLayout>,
  },
  {
    path:"/dashboard",
    element:<ProtectedRoute><MainLayout><Dashboard/></MainLayout></ProtectedRoute>
  },
  {
    path:"/signup",
    element:<MainLayout><Signup/></MainLayout>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
