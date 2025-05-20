import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid2 } from "@mui/material";
// import AppAppBar from "./AppAppBar";

export default function Navbar() {
  const [loggedInStatus, setLoggedInStatus] = useState(true);
  const role = Cookies.get("role") || "customer";
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken"); // Get the access token from the cookie

  useEffect(() => {
    const verifyToken = async () => {
      if (!accessToken) {
        setLoggedInStatus(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify-token`,
          {
            accessToken,
          }
        );
        console.log(response);
        if (response.status === 200) {
          Cookies.set("role", response.data.role);
          setLoggedInStatus(true);
        } else {
          setLoggedInStatus(false);
        }
      } catch (error) {
        console.log(error);
        setLoggedInStatus(false);
      }
    };

    verifyToken();
  }, [accessToken]);

  const logout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("role");
    Cookies.remove("userId");
    navigate("/login");
  };

  return (
    <div>
      hello
    </div>
  );
}
