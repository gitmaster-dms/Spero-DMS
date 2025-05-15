import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, InputAdornment, Grid, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Search, ArrowBack } from "@mui/icons-material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from "@mui/material/styles";
// import { alerts } from "./../../../DispatchModule/SOP/dummydata";
import Pagination from '@mui/material/Pagination';
import { Select, MenuItem, IconButton, Popper  } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAuth } from './../../../../Context/ContextAPI';

function Add_employee({ darkMode }) {
   const { states,districts,selectedStateId, setSelectedStateId,loading,error,} = useAuth();

 const handleStateChange = (e) => {
    const id = e.target.value;
    setSelectedStateId(id);
  };
  const textColor = darkMode ? "#ffffff" : "#000000";
  const bgColor = darkMode ? "#0a1929" : "#ffffff";

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // default 5 rows



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
    background: theme.palette.mode === "dark" ? "#112240" : "#fff",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    marginTop: "0.5em",
    borderRadius: "8px",
    padding: "10px 12px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 0 8px ${status === "Completed"
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

  const Alert = [
    "Emp Name",
    "Emp Contact",
    "Emp Email",
    "Emp DOJ",
    "Group ID",
    "Emp DOB",
     "State",

    // "State",
    // "District",
    // "Tehsil",
    // "City",
    "Action",
  ];



  const alerts = [
    {
      id: 1,
      alertId: "Flood",
      disasterId: "Unknown",
      disasterType: "Unknownd",
      date: "",
      time: "Unknown",
      priority: "Unknown",
      initiatedBy: "Unknown",
     
    },
    {
      id: 2,
      alertId: "Flood",
      disasterId: "Unknown",
      disasterType: "Unknown",
      date: "",
      time: "Unknown",
      priority: "Unknown",
      initiatedBy: "Unknown",
      status: "Unknown",
    },
    {
      id: 3,
      alertId: "Flood",
      disasterId: "Unknown",
      disasterType: "Unknown",
      date: "",
      time: "Unknown",
      priority: "Unknown",
      initiatedBy: "Unknown",
      status: "Unknown",
    },
    {
      id: 4,
      alertId: "Flood",
      disasterId: "Unknown",
      disasterType: "Unknownone",
      date: "",
      time: "Unknown",
      priority: "Unknown",
      initiatedBy: "Unknown",
      status: "Unknown",
    },
    {
      id: 5,
      alertId: "Flood",
      disasterId: "Unknown",
      disasterType: "Unknownd",
      date: "",
      time: "Unknown",
      priority: "Unknown",
      initiatedBy: "Unknown",
      status: "Unknown",
    },
    {
      id: 6,
      alertId: "Flood",
      disasterId: "Unknown",
      disasterType: "Unknown",
      date: "",
      time: "Unknown",
      priority: "Unknown",
      initiatedBy: "Unknown",
      status: "Unknown",
    },
   
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page
  };

const [anchorEl, setAnchorEl] = useState(null);


  return (
    <div>
     <Box sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2, mt: 3 }}>

        {/* Back Arrow */}
        <IconButton size="small" onClick={() => {/* handle back action here */ }} sx={{
          backgroundColor: "#00f0c0",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#00d8ac",
          },
          width: 30,
          height: 30,
        }}>
          <ArrowBackIosIcon sx={{ fontSize: 20, color: darkMode ? "#fff" : "#000", }} />
        </IconButton>

        {/* Label */}
        <Typography variant="subtitle2" sx={{ fontWeight: 500, color: darkMode ? "#fff" : "#000" }}>
          Add Employee
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "gray", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "200px",
            ml: 5,
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              backgroundColor: darkMode ? "#1e293b" : "#fff",
              color: darkMode ? "#fff" : "#000",
              px: 1,
              py: 0.2,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#444" : "#ccc",
            },
            "& input": {
              color: darkMode ? "#fff" : "#000",
              padding: "6px 8px",
              fontSize: "13px",
            },
          }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, backgroundColor: bgColor, mt: 1, mb: 1 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  <EnquiryCard sx={{ display: "flex", flexDirection: "row" }}>
                    {Alert.map((label, idx) => (
                      <StyledCardContent
                        key={idx}
                        sx={{ flex: 1, justifyContent: "center" }}
                      >
                        <Typography variant="subtitle2" fontWeight={500}>
                          {label}
                        </Typography>
                      </StyledCardContent>
                    ))}
                  </EnquiryCard>

                  {alerts.length === 0 ? (
                    <Box p={2}>
                      <Typography align="center" color="textSecondary">
                        No tasks available.
                      </Typography>
                    </Box>
                  ) : (
                    alerts
                      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((item) => (
                        <EnquiryCardBody
                          key={item.id}
                          status={item.status}
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          {[item.alertId, item.disasterId, item.disasterType, `${item.date} ${item.time}`].map(
                            (val, i) => (
                              <StyledCardContent key={i} sx={{ flex: 1, justifyContent: "center" }}>
                                <Typography variant="subtitle2">{val}</Typography>
                              </StyledCardContent>
                            )
                          )}
                          <StyledCardContent sx={{ flex: 1, justifyContent: "center" }}>
                            <Typography variant="subtitle2">
                              {item.priority}
                            </Typography>
                          </StyledCardContent>
                          <StyledCardContent sx={{ flex: 1, justifyContent: "center" }}>
                            <Typography variant="subtitle2">{item.initiatedBy}</Typography>
                          </StyledCardContent>
                          <StyledCardContent sx={{ flex: 1, justifyContent: "center" }}>
                            <Typography variant="subtitle2">{item.initiatedBy}</Typography>
                          </StyledCardContent>
                          <StyledCardContent sx={{ flex: 1, justifyContent: "center" }}>
                            <MoreHorizIcon
                              sx={{
                                color: "#00f0c0",
                                cursor: "pointer",
                                fontSize: 28,
                              }}
                            />
                          </StyledCardContent>
                        </EnquiryCardBody>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              px={1}
            >
              {/* Left: Records per page */}
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Records per page:
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  size="small"
                  variant="outlined"
                 sx={{
                    fontSize: "13px",
                    color: textColor,
                    borderColor: bgColor,
                    height: "30px",
                    minWidth: "70px",
                    backgroundColor: "transparent",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: textColor,
                    },
                    "& .MuiSvgIcon-root": {
                      color: textColor,
                    },
                  }}
                >
                
                  {[5, 10, 25, 50].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Right: Single-box Pagination */}
              <Box
                sx={{
                  border: "1px solid #ffffff",
                  borderRadius: "6px",
                  px: 2,
                  py: 0.5,
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
               color:textColor,
                  fontSize: "13px",
                  cursor: "default",
                }}
              >
                <Box
                  onClick={() => page > 1 && setPage(page - 1)}
                  sx={{ cursor: page > 1 ? "pointer" : "not-allowed", userSelect: "none" }}
                >
                  &#8249;
                </Box>

                <Box>{Math.ceil(alerts.length / rowsPerPage)}</Box>

                <Box
                  onClick={() =>
                    page < Math.ceil(alerts.length / rowsPerPage) && setPage(page + 1)
                  }
                  sx={{
                    cursor:
                      page < Math.ceil(alerts.length / rowsPerPage)
                        ? "pointer"
                        : "not-allowed",
                    userSelect: "none",
                  }}
                >
                  &#8250;
                </Box>
              </Box>

            </Box>




          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 1, borderRadius: 3, backgroundColor: bgColor, mt: 1, mb: 5 }}>
            <h3>Add Employee</h3>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {/* First TextField */}
              <TextField
                fullWidth
                placeholder="Employee Name"
                InputLabelProps={{ shrink: false }}
                sx={{
                  // Set desired width
                  height: "3rem",
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                  '& .MuiInputBase-root': {
                    height: "100%",             // Ensure input wrapper matches height
                    padding: "0 12px",          // Horizontal padding
                    display: 'flex',
                    alignItems: 'center',       // Center content vertically
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                    color: textColor,
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                }}
              />
              {/* Second TextField */}
              <TextField
                fullWidth
                placeholder="Emp Contact No"
                InputLabelProps={{ shrink: false }}
                sx={{
                  // Set desired width
                  height: "3rem",
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                  '& .MuiInputBase-root': {
                    height: "100%",             // Ensure input wrapper matches height
                    padding: "0 12px",          // Horizontal padding
                    display: 'flex',
                    alignItems: 'center',       // Center content vertically
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                     color: textColor,
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {/* First TextField */}
              <TextField
                fullWidth
                placeholder="Employee Email"
                InputLabelProps={{ shrink: false }}
                sx={{
                  // Set desired width
                  height: "3rem",
                  '& .MuiInputBase-input': {
                     color: textColor,
                  },
                  '& .MuiInputBase-root': {
                    height: "100%",             // Ensure input wrapper matches height
                    padding: "0 12px",          // Horizontal padding
                    display: 'flex',
                    alignItems: 'center',       // Center content vertically
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                    color: textColor,
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                }}
              />
              {/* Second TextField */}
              <TextField
                fullWidth
                placeholder="Emp DOJ"
                InputLabelProps={{ shrink: false }}
                sx={{
                  // Set desired width
                  height: "3rem",
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                  '& .MuiInputBase-root': {
                    height: "100%",             // Ensure input wrapper matches height
                    padding: "0 12px",          // Horizontal padding
                    display: 'flex',
                    alignItems: 'center',       // Center content vertically
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                     color: textColor,
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {/* First TextField */}
              <TextField
                fullWidth
                placeholder="Group ID"
                InputLabelProps={{ shrink: false }}
                sx={{
                  // Set desired width
                  height: "3rem",
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                  '& .MuiInputBase-root': {
                    height: "100%",             // Ensure input wrapper matches height
                    padding: "0 12px",          // Horizontal padding
                    display: 'flex',
                    alignItems: 'center',       // Center content vertically
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                    color: textColor,
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                }}
              />
              {/* Second Select  */}
              <Select
              value={selectedStateId || ''} onChange={handleStateChange}
                fullWidth
                displayEmpty
                placeholder="Select State"
                defaultValue=""
                inputProps={{
                  "aria-label": "Select State",
                }}
                sx={{
                  height: '3rem',
                  '& .MuiSelect-root': {
                    color: textColor,
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Remove border outline
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                    color: textColor,
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white !important', // Dropdown icon color
                  },
                }}
                IconComponent={KeyboardArrowDownIcon} // Use outlined dropdown arrow
              >
                <MenuItem value="" disabled>
                  Select State
                </MenuItem>
                  {states.map(state => (
                <MenuItem key={state.state_id}  value={state.state_id}>{state.state_name}</MenuItem>
                 ))}

                 
                {/* Add more options as needed */}
              </Select>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {/* First Dropdown */}
              <Select
                fullWidth
                displayEmpty
                placeholder="Select District"
                defaultValue=""
                inputProps={{
                  "aria-label": "Select Name",
                }}
                sx={{
                  height: '3rem',
                  '& .MuiSelect-root': {
                    color: textColor,
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Remove border outline
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                    color: textColor,
                  },
                  '& .MuiSvgIcon-root': {
                     color: textColor,// Dropdown icon color
                  },
                }}
                IconComponent={KeyboardArrowDownIcon} // Use outlined dropdown arrow
              >
                <MenuItem value="" disabled>
                  Select District
                </MenuItem>
                 {districts.map(districts => (
                <MenuItem key={districts.dis_id} value={districts.dis_id}>{districts. dis_name}</MenuItem>
                 ))}
                {/* Add more options as needed */}
              </Select>

              {/* Second Dropdown */}
              <Select
                fullWidth
                displayEmpty
                placeholder="Select Tehsil"
                defaultValue=""
                inputProps={{
                  "aria-label": "Select Name",
                }}
                sx={{
                  height: '3rem',
                  '& .MuiSelect-root': {
                    color: textColor,
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Remove border outline
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                  '& .MuiSvgIcon-root': {
                    color: textColor, // Dropdown icon color
                  },
                }}
                IconComponent={KeyboardArrowDownIcon} // Use outlined dropdown arrow
              >
                <MenuItem value="" disabled>
                  Select Tehsil 
                </MenuItem>
           
                <MenuItem  value="">option2</MenuItem>
             
               
                {/* Add more options as needed */}
              </Select>
            </Box>

             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {/* First Dropdown */}
              <Select
                fullWidth
                displayEmpty
                placeholder="Select City"
                defaultValue=""
                inputProps={{
                  "aria-label": "Select Name",
                }}
                sx={{
                  height: '3rem',
                  '& .MuiSelect-root': {
                   color: textColor,
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Remove border outline
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                     color: textColor,
                  },
                  '& .MuiSvgIcon-root': {
                     color: textColor,// Dropdown icon color
                  },
                }}
                IconComponent={KeyboardArrowDownIcon} // Use outlined dropdown arrow
              >
                <MenuItem value="" disabled>
                  Select City
                </MenuItem>
             
                <MenuItem value="">option 1</MenuItem>
                 
                {/* Add more options as needed */}
              </Select>

              {/* Second Textfield */}

                <TextField
                fullWidth
                placeholder="Employee DOB"
                InputLabelProps={{ shrink: false }}
                sx={{
                  // Set desired width
                  height: "3rem",
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                  '& .MuiInputBase-root': {
                    height: "100%",             // Ensure input wrapper matches height
                    padding: "0 12px",          // Horizontal padding
                    display: 'flex',
                    alignItems: 'center',       // Center content vertically
                  },
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none', // Remove border
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  '& input::placeholder': {
                    fontSize: '0.85rem',
                    color: textColor,
                  },
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
                  '&:hover': {
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                  },
                }}
              />
              
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
              <Button
                variant="contained"
                sx={{
              
                  width: '40%',
                  backgroundColor: '#00f0c0', // Set background color
                   color: textColor,// Set text color to black

                  fontWeight: 'bold',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: bgColor, // Change background color on hover
                    color: textColor,
                  },
                }}
              >
                Submit
              </Button>
            </Box>

          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Add_employee
