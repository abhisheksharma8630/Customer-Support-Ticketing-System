import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AgentsData from "./components/AgentsData";

function Agents() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Agents
      </Typography>
      <Button variant="contained" startIcon={<PersonAddAltRoundedIcon/>} href="/agents/create">Add Agent</Button>
      </Box>
      <AgentsData/>
    </Box>
  );
}

export default Agents;
