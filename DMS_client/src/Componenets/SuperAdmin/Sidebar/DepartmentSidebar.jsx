import React, { useState, useRef, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Paper,
  useMediaQuery,
  Grid,
  ClickAwayListener,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import AddDepartment from "../System/Department/AddDepartment";
import { useNavigate } from "react-router-dom";
import EmployeReg from "../System/Employee_reg/Employee_reg";
import AddGroup from "../System/Groups/Add_group";


const Departmentsidebar = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [activePage, setActivePage] = useState(""); // 👈 track selected menu
  const systemUserRef = useRef(null);
  const [dropdownAnchor, setDropdownAnchor] = useState({ top: 0, left: 0 });

 const screens = [
  {
    id: "department",
    text: "Department Registration",
    path: "/department",
    component: (props) => <AddDepartment {...props} />,
  },
  {
    id: "group",
    text: "Group Registration",
    path: "/group",
    component: (props) => <AddGroup {...props} />,
  },
  {
    id: "employee",
    text: "Employee Registration",
    path: "/employee",
    component: (props) => <EmployeReg {...props} />,
  },
];


  useEffect(() => {
    if (dropdownOpen && systemUserRef.current) {
      const rect = systemUserRef.current.getBoundingClientRect();
      setDropdownAnchor({ top: rect.top, left: rect.right + 10 });
    }
  }, [dropdownOpen, open]);

  const handleMenuClick = (page) => {
    setActivePage(page);
    setDropdownOpen(false); // close dropdown
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ height: "100vh" }}
        alignItems="flex-start"
      >
        {/* Sidebar */}
        <Grid item>
          <Drawer
            variant="permanent"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            sx={{
              width: open ? 200 : 60,
              "& .MuiDrawer-paper": {
                width: open ? 200 : 60,
                height: 300,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                background: "linear-gradient(to bottom, #5FECC8, #5FECC80D)",
                borderRadius: "30px",
                transition: "width 0.5s ease-in-out",
                padding: "1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <List>
                <ListItemButton
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  sx={{ flexDirection: "column", alignItems: "center" }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary="System User"
                      primaryTypographyProps={{ variant: "caption" }}
                    />
                  )}
                </ListItemButton>

                <ListItemButton
                  sx={{ flexDirection: "column", alignItems: "center" }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <LockIcon />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary="Permission"
                      primaryTypographyProps={{ variant: "caption" }}
                    />
                  )}
                </ListItemButton>
              </List>
            </Box>
          </Drawer>
        </Grid>

        {/* Right side content */}
        <Grid item xs sx={{ p: 2 }}>
          {screens
            .find((screen) => screen.id === activePage)
            ?.component({ darkMode })}
        </Grid>
      </Grid>

      {dropdownOpen && (
        <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
          <Paper
            elevation={4}
            sx={{
              position: "fixed",
              top: dropdownAnchor.top,
              left: dropdownAnchor.left,
              zIndex: 2000,
              borderRadius: 2,
              p: 1,
              minWidth: 220,
              backgroundColor: "#fff",
            }}
          >
            <List>
              {screens.map((screen) => (
               <ListItemButton
  key={screen.id}
  onClick={() => {
    setActivePage(screen.id);
    setDropdownOpen(false);
    navigate(screen.path); // ✅ Navigate to route
  }}
  sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
>
  <ListItemText primary={screen.text} sx={{ color: "black" }} />
</ListItemButton>

              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </>
  );
};

export default Departmentsidebar;
