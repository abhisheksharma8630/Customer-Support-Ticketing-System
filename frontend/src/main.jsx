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
import Navbar from '../components/navbar.jsx'
import ProtectedRoute from '../components/protectedRoute.jsx'

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
    element: <ProtectedRoute><MainLayout><Chat/></MainLayout></ProtectedRoute>,
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
