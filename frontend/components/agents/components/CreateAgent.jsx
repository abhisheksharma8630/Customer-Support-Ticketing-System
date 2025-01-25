import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid2,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const CreateAgent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
    role: "agent",
    department: "technical",
    permissions: ["view_tickets"],
    languages: ["English"],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionsChange = (e) => {
    const { value } = e.target;
    const isChecked = formData.permissions.includes(value);
    setFormData({
      ...formData,
      permissions: isChecked
        ? formData.permissions.filter((p) => p !== value)
        : [...formData.permissions, value],
    });
  };

  const handleLanguagesChange = (e) => {
    const { value } = e.target;
    const isChecked = formData.languages.includes(value);
    setFormData({
      ...formData,
      languages: isChecked
        ? formData.languages.filter((l) => l !== value)
        : [...formData.languages, value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/agent`,
      {formData},{headers:{Authorization:`Bearer ${Cookies.get('accessToken')}`}}
    );
    console.log(response);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Create Agent
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} gap={2} flexDirection={"column"}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6} size={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} sm={6} size={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} size={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                required
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid2>
            <Grid2 item xs={12} size={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item xs={12} size={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  input={<OutlinedInput notched label={"Department"} />}
                >
                  <MenuItem value="technical">Technical</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  <MenuItem value="general inquiries">
                    General Inquiries
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 item xs={12} size={6}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">Languages</Typography>
                <FormGroup row>
                  {["English", "Spanish", "French", "German"].map((lang) => (
                    <FormControlLabel
                      key={lang}
                      control={
                        <Checkbox
                          checked={formData.languages.includes(lang)}
                          onChange={handleLanguagesChange}
                          value={lang}
                        />
                      }
                      label={lang}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} size={6}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">Permissions</Typography>
                <FormGroup row>
                  {["view_tickets", "assign_tickets", "resolve_tickets"].map(
                    (perm) => (
                      <FormControlLabel
                        key={perm}
                        control={
                          <Checkbox
                            checked={formData.permissions.includes(perm)}
                            onChange={handlePermissionsChange}
                            value={perm}
                          />
                        }
                        label={perm.replace("_", " ").toUpperCase()}
                      />
                    )
                  )}
                </FormGroup>
              </FormControl>
            </Grid2>
          </Grid2>
          <Grid2 container justifyContent={"flex-end"}>
            <Grid2 item xs={12} size={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Agent
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </form>
    </Box>
  );
};

export default CreateAgent;
