import { useState, useEffect, useMemo } from "react";
import { Box, Typography, TextField, Button, Paper, InputAdornment, Grid, Popover} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Search, ArrowBack,DeleteOutline,EditOutlined, } from "@mui/icons-material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from "@mui/material/styles";
import Pagination from '@mui/material/Pagination';
import { Select, MenuItem, IconButton, Popper } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from "@mui/icons-material/Visibility";



function Add_group({ darkMode }) {

  const textColor = darkMode ? "#ffffff" : "#000000";
  const bgColor = darkMode ? "#0a1929" : "#ffffff";
  const labelColor = darkMode ? "#5FECC8" : "#1976d2";
  const fontFamily = "Roboto, sans-serif";
  const borderColor = darkMode ? "#7F7F7F" : "#ccc";

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
     const [anchorEl, setAnchorEl] = useState(null);


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

  const fontsTableHeading = {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0,
    textAlign: "center",
  };

  const inputBgColor = darkMode
    ? "rgba(255, 255, 255, 0.16)"
    : "rgba(0, 0, 0, 0.04)";


  const inputStyle = {

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
    backgroundColor: inputBgColor,
    '& input::placeholder': {
      fontSize: '0.85rem',
      color: textColor,
    },
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add box shadow
    '&:hover': {
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
    }
  }

  const fontsTableBody = {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 13,
    letterSpacing: 0,
    textAlign: "center",
  };


  const [alertData, setAlertData] = useState([
    {
      departmentID: "D-2202020",
      groupName: "User Admin",
    },
    {
      departmentID: "D-2202020",
      groupName: " Employee Admin",
    },
    {
      departmentID: "D-2202020",
      groupName: "Yes Admin",
    },
    {
      departmentID: "D-2202020",
      groupName: "NO Admin",
    },
    {
      departmentID: "D-2202020",
      groupName: "Small Admin",
    },
    {
      departmentID: "D-2202020",
      groupName: "Big Admin",
    },
    {
      departmentID: "D-2202020",
      groupName: "Super Admin",
    },
    // Add more dummy objects...
  ]);


  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return alertData.slice(start, end);
  }, [page, rowsPerPage, alertData]);


   const open = Boolean(anchorEl);
  const handleOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    // Optionally store item in state if needed
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Typography variant="h6" sx={{
          color: labelColor,
          fontWeight: 600,
          fontFamily,
          fontSize: 16,
        }}>
          Add Group
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
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, backgroundColor: bgColor, mt: 1, mb: 5 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <EnquiryCard sx={{
                      backgroundColor: "#5FECC8",
                      color: "#000",
                      display: "flex",
                      width: "100%",
                      borderRadius: 2,
                      p: 3,
                    }}>
                      <StyledCardContent
                        sx={{
                          flex: 0.6,
                          borderRight: "1px solid black",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="subtitle2" sx={fontsTableHeading}>
                          Sr. No
                        </Typography>
                      </StyledCardContent>


                      <StyledCardContent
                        sx={{
                          flex: 1.9,
                          borderRight: "1px solid black",
                          justifyContent: "center",
                          ...fontsTableHeading,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Department ID
                        </Typography>
                      </StyledCardContent>
                      <StyledCardContent
                        sx={{
                          flex: 2,
                          borderRight: "1px solid black",
                          justifyContent: "center",
                          ...fontsTableHeading,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Group Name
                        </Typography>
                      </StyledCardContent>

                      <StyledCardContent
                        sx={{
                          flex: 0.2,
                          justifyContent: "center",
                          ...fontsTableHeading,
                        }}
                      >
                        <Typography variant="subtitle2">Actions</Typography>
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
                    </EnquiryCard>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedData.length === 0 ? (
                    <Box p={2}>
                      <Typography align="center" color="textSecondary">
                        No tasks available.
                      </Typography>
                    </Box>
                  ) : (
                    paginatedData
                      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((item, index) => (
                        <EnquiryCardBody
                          key={index}
                          sx={{
                            backgroundColor: inputBgColor,
                            p: 2,
                            borderRadius: 2,
                            color: textColor,
                            display: "flex",
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          <StyledCardContent
                            sx={{ flex: 0.6, justifyContent: "center" }}
                          >
                            <Typography variant="subtitle2" sx={fontsTableBody}>
                              {(page - 1) * rowsPerPage + index + 1}
                            </Typography>
                          </StyledCardContent>

                          <StyledCardContent
                            sx={{
                              flex: 2,
                              justifyContent: "center",
                              ...fontsTableBody,
                            }}
                          >
                            <Typography variant="subtitle2">
                              {item.departmentID}
                            </Typography>
                          </StyledCardContent>
                          <StyledCardContent
                            sx={{
                              flex: 2,
                              justifyContent: "center",
                              ...fontsTableBody,
                            }}
                          >
                            <Typography variant="subtitle2">
                              {item.groupName}
                            </Typography>
                          </StyledCardContent>

                          <StyledCardContent
                            sx={{
                              flex: 1.5,
                              justifyContent: "center",
                              ...fontsTableBody,
                            }}
                          >
                            <MoreHorizIcon
                              onClick={(e) => handleOpen(e, item)}
                              sx={{
                                color: "#00f0c0",
                                cursor: "pointer",
                                fontSize: 28,
                                justifyContent: "center",
                                ...fontsTableBody,
                              }}
                            />
                          </StyledCardContent>
                        </EnquiryCardBody>
                      ))
                  )}
                  {/* {paginatedData.map((item, index) => ( */}

                  {/* // ))} */}
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
              {/* Records Per Page */}
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ color: textColor }}>
                  Records per page:
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value));
                    setPage(1); // Reset to first page on limit change
                  }}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "13px",
                    color: textColor,
                    borderColor: borderColor,
                    height: "30px",
                    minWidth: "70px",
                    backgroundColor: bgColor,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: borderColor,
                    },
                    "& .MuiSvgIcon-root": { color: textColor },
                  }}
                >
                  {[5, 10, 25, 50].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Page Navigation */}
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
                  color: textColor,
                  fontSize: "13px",
                }}
              >
                <Box
                  onClick={() => page > 1 && setPage(page - 1)}
                  sx={{
                    cursor: page > 1 ? "pointer" : "not-allowed",
                    userSelect: "none",
                  }}
                >
                  &#8249;
                </Box>
                <Box>{page}</Box>
                <Box
                  onClick={() =>
                    page < Math.ceil(alertData.length / rowsPerPage) &&
                    setPage(page + 1)
                  }
                  sx={{
                    cursor:
                      page < Math.ceil(alertData.length / rowsPerPage)
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

             <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    sx: {
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      borderRadius: 2,
                      minWidth: 120,
                    },
                  }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => {
                      alert("View clicked");
                      handleClose();
                    }}
                  >
                    View
                  </Button>
        
                  <Button
                    fullWidth
                    variant="outlined"
                    color="warning"
                    startIcon={<EditOutlined />}
                    onClick={() => {
                      alert("Edit clicked");
                      handleClose();
                    }}
                  >
                    Edit
                  </Button>
        
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutline />}
                    onClick={() => {
                      alert("Delete clicked");
                      handleClose();
                    }}
                  >
                    Delete
                  </Button>
                </Popover>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, backgroundColor: bgColor, mt: 1, mb: 5 }}>
            <Typography
              sx={{
                color: labelColor,
                fontWeight: 600,
                fontSize: 16,

                mb: 2,
                fontFamily,
              }}
            >
              Add Group
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {/* First TextField */}
              <TextField
                fullWidth
                placeholder="Department ID"
                InputLabelProps={{ shrink: false }}
                sx={inputStyle}

              />
              {/* Second TextField */}
              <TextField
                fullWidth
                placeholder="Group Name"
                InputLabelProps={{ shrink: false }}
                sx={inputStyle}
              />
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
                 <Button
                                variant="contained"
                                sx={{
                                  mt: 2,
                                  width: "40%",
                                  backgroundColor: "#00f0c0",
                                  color: "black",
                                  fontWeight: "bold",
                                  borderRadius: "12px",
                                  "&:hover": {
                                    backgroundColor: bgColor,
                                    color: "white !important",
                                  },
                                }}
                              >Submit
              </Button>
            </Box>

          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Add_group
