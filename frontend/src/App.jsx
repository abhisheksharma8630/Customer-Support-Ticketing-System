import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "../components/sign-in/SignIn.jsx";
import Signup from "../pages/signup/signup.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ProtectedRoute from "../components/protectedRoute.jsx";
import TicketPage from "../pages/Ticket/ticket.jsx";
import RaiseTicket, { ChatBot } from "../pages/chat/Chat";
import MarketingPage from "../components/marketing-page/MarketingPage.jsx"
import GlobalSnackbar from "../components/GlobalSnackbar.jsx";
import Dashboard2 from "../components/dashboard/Dashboard.jsx"
import Layout from "../components/Layout.jsx";
import CustomizedDataGrid from "../components/dashboard/components/CustomizedDataGrid.jsx";
import Agents from "../components/agents/Agents.jsx";
import CreateAgent from "../components/agents/components/CreateAgent.jsx"
import Customer from "../pages/Customer/Customer.jsx";


const MainLayout = ({ children }) => (
  <div>
    <GlobalSnackbar/>
    <div>{children}</div>
  </div>
);

const router = createBrowserRouter([
  {
    path:"/7217362423/customer",
    element:<Customer/>
  },
  {
    path: "/",
    element: (
      <MainLayout>
        <MarketingPage/>
      </MainLayout>
    ),
  },
  {
    path: "/ticket",
    element: (
      <MainLayout>
        <ChatBot />
      </MainLayout>
    ),
  },
  {
    path: "/ticket/:id",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Layout>
            <TicketPage />
          </Layout>
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <SignIn />
      </MainLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
        <MainLayout>
          <Layout>
            <CustomizedDataGrid/>
          </Layout>
        </MainLayout>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/add-agent",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Signup role="agent" />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <MainLayout>
        <Signup />
      </MainLayout>
    ),
  },
  {
    path:"/agents",
    element:(
      <MainLayout>
        <Layout>
          <Agents/>
        </Layout>
      </MainLayout>
    )
  },
  {
    path:"/agents/create",
    element:(
      <MainLayout>
        <Layout>
          <CreateAgent/>
        </Layout>
      </MainLayout>
    )
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
