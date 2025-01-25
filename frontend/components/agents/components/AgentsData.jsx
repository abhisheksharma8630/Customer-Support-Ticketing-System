import { Grid2 } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AgentCard from "./AgentCard";

function AgentsData() {
  const [agents, setAgents] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/agent`,
      {
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      }
    );
    setAgents(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Grid2 container spacing={2}>
        {agents.map((agent, index) => (
          <Grid2 item size={12} key={index}>
            <AgentCard agent={agent} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default AgentsData;
