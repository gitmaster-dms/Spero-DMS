import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Stack,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  CardContent,
  TableHead,
  TableRow,
  IconButton,
  Modal,
} from "@mui/material";
import { Search, Visibility, AddCircleOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const EnquiryCard = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#5FECC8",
  borderRadius: "8px 10px 0 0",
  padding: "6px 12px",
  color: "black",
  height: "40px",
}));

const EnquiryCardBody = styled("tr")(({ theme, status }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.mode === "dark" ? "#1E243E" : "#FFFFFF",
  color: theme.palette.mode === "dark" ? "red" : "#FFFFFF",
  marginTop: "0.5em",
  borderRadius: "8px",
  padding: "10px 12px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    boxShadow: `0 0 8px ${
      status === "Completed"
        ? "#00e67699"
        : status === "Pending"
        ? "#f4433699"
        : "#88888855"
    }`,
  },
  height: "45px",
}));

const StyledCardContent = styled("td")({
  padding: "0 8px",
  display: "flex",
  alignItems: "center",
});
const alertData = [
  {
    id: 1,
    incidentId: "2023052400004",
    eventDateTime: "4-04-2025 13:44:07",
    location: "North Goa",
    alertType: "Unknown",
    trigger: "Triggered",
    status: "65%",
  },
  {
    id: 2,
    incidentId: "2023052400005",
    eventDateTime: "4-04-2025 13:44:07",
    location: "North Goa",
    alertType: "Unknown",
    trigger: "Trigger",
    status: "10%",
  },
  {
    id: 3,
    incidentId: "2023052400005",
    eventDateTime: "4-04-2025 13:44:07",
    location: "North Goa",
    alertType: "Unknown",
    trigger: "Trigger",
    status: "30%",
  },
  {
    id: 4,
    incidentId: "2023052400005",
    eventDateTime: "4-04-2025 13:44:07",
    location: "North Goa",
    alertType: "Unknown",
    trigger: "Trigger",
    status: "80%",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "red",
  color: "black",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddDepartment = ({ darkMode, flag, setFlag, setSelectedIncident }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const labelColor = darkMode ? "#5FECC8" : "#1976d2";
  const borderColor = darkMode ? "#7F7F7F" : "#ccc";
  const fontFamily = "Roboto, sans-serif";
  const textColor = darkMode ? "#ffffff" : "#000000";
  const bgColor = darkMode ? "#0a1929" : "#ffffff";

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "#5FECC8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <ArrowBackIcon sx={{ color: "#000000" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <AccountCircleIcon sx={{ color: labelColor }} /> */}
            <Typography
              variant="h6"
              sx={{ color: labelColor, fontWeight: 600, fontFamily }}
            >
              Add Employee
            </Typography>
            <TextField
              placeholder="Search your location"
              variant="outlined"
              fullWidth
              sx={{
                input: { color: textColor },
                label: { color: textColor },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: darkMode ? "#ffffff29" : "#f4f4f4",
                  borderRadius: "30px",
                },
              }}
            />
          </Box>{" "}
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              backgroundColor: bgColor,
              p: 2,
              borderRadius: 2,
              color: textColor,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <EnquiryCard
                      sx={{
                        backgroundColor: "#5FECC8",
                        color: "#000",
                        display: "flex",
                        width: "100%",
                        borderRadius: 2,
                        p: 3,
                      }}
                    >
                      <StyledCardContent
                        sx={{ flex: 0.3, borderRight: "1px solid black" }}
                      >
                        <Typography variant="subtitle2">Sr. No</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 1.3, borderRight: "1px solid black" }}
                      >
                        <Typography variant="subtitle2">
                          Department Name
                        </Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 1.2, borderRight: "1px solid black" }}
                      >
                        <Typography variant="subtitle2">Disaster ID</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 1, borderRight: "1px solid black" }}
                      >
                        <Typography variant="subtitle2">State</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 1, borderRight: "1px solid black" }}
                      >
                        <Typography variant="subtitle2">District</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 1, borderRight: "1px solid black" }}
                      >
                        <Typography variant="subtitle2">Tehsil</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{
                          flex: 1,
                          textAlign: "center",
                          borderRight: "1px solid black",
                        }}
                      >
                        <Typography variant="subtitle2">City</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 0.8, textAlign: "center" }}
                      >
                        <Typography variant="subtitle2">Actions</Typography>
                      </StyledCardContent>
                    </EnquiryCard>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {alertData.map((item, index) => (
                    <EnquiryCardBody
                      key={index}
                      sx={{
                        backgroundColor: bgColor,
                        p: 2,
                        borderRadius: 2,
                        color: textColor,
                        display: "flex",
                        width: "100%",
                        mb: 1,
                      }}
                    >
                      <StyledCardContent sx={{ flex: 0.3 }}>
                        <Typography variant="subtitle2">{index + 1}</Typography>
                      </StyledCardContent>
                      <StyledCardContent sx={{ flex: 1.5 }}>
                        <Typography variant="subtitle2">
                          Mock Details
                        </Typography>
                      </StyledCardContent>
                      <StyledCardContent sx={{ flex: 1.1 }}>
                        <Typography variant="subtitle2">+1222222</Typography>
                      </StyledCardContent>
                      <StyledCardContent sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">Maharashtra</Typography>
                      </StyledCardContent>
                      <StyledCardContent sx={{ flex:0.8 }}>
                        <Typography variant="subtitle2">Pune</Typography>
                      </StyledCardContent>
                      <StyledCardContent sx={{ flex: 1.3 }}>
                        <Typography variant="subtitle2">Talegaon</Typography>
                      </StyledCardContent>
                      <StyledCardContent sx={{ flex: 1.3}}>
                        <Typography variant="subtitle2">Lohgaon</Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{ flex: 0.8, textAlign: "center" }}
                      >
                        <IconButton onClick={handleOpen}>
                          <VisibilityIcon sx={{ color: labelColor }} />
                        </IconButton>
                      </StyledCardContent>
                    </EnquiryCardBody>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Modal open={modalOpen} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              User Actions
            </Typography>
            <Typography sx={{ mt: 2 }}>View | Edit | Delete</Typography>
          </Box>
        </Modal>

        {/* Department Registration Form */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              backgroundColor: bgColor,
              p: 2,
              borderRadius: 2,
              color: textColor,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                mb: 2,
                fontFamily,
              }}
            >
              Add User
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department Name"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF29",
                    input: { color: textColor, height: "0.7em" },
                    label: { color: textColor },
                  }}
                  InputLabelProps={{ style: { color: textColor } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Disaster ID"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF29",
                    input: { color: textColor, height: "0.7em" },
                    label: { color: textColor },
                  }}
                  InputLabelProps={{ style: { color: textColor } }}
                >
                  <MenuItem value="DID001">DID001</MenuItem>
                  <MenuItem value="DID002">DID002</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF29",
                    input: { color: textColor, height: "0.7em" },
                    label: { color: textColor },
                  }}
                  InputLabelProps={{ style: { color: textColor } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="District"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF29",
                    input: { color: textColor, height: "0.7em" },
                    label: { color: textColor },
                  }}
                  InputLabelProps={{ style: { color: textColor } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tehsil"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF29",
                    input: { color: textColor, height: "0.7em" },
                    label: { color: textColor },
                  }}
                  InputLabelProps={{ style: { color: textColor } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#FFFFFF29",
                    input: { color: textColor, height: "0.7em" },
                    label: { color: textColor },
                  }}
                  InputLabelProps={{ style: { color: textColor } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#5FECC8",
                    color: "#000",
                    fontWeight: "bold",
                    mt: 2,
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddDepartment;
