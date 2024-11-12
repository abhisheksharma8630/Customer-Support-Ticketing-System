import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null); // Initialize state for verification status
  const accessToken = Cookies.get('accessToken'); // Get the access token from the cookie

  useEffect(() => {
    const verifyToken = async () => {
      if (!accessToken) {
        setIsVerified(false);
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verify-token`, {
          accessToken,
        });
        console.log(response)
        if (response.status === 200) {
          Cookies.set("role",response.data.role);
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.log(error)
        setIsVerified(false);
      }
    };

    verifyToken();
  }, [accessToken]);

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  if (isVerified === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
