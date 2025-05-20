import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const AgentCard = ({ agent }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={agent.profilePicture || "https://via.placeholder.com/140"}
        alt={`${agent.firstName} ${agent.lastName}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {`${agent.firstName} ${agent.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {agent.role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Department: {agent.department}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {agent.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {agent.phoneNumber || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
