// src/App.js
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";

import Navbar from "./Componenets/Navbar/Navbar";
import Footer from "./Componenets/Footer/Footer";
import Sidebar from "./Componenets/DispatchModule/Sidebar/Sidebar";
import Departmentsidebar from "./Componenets/SuperAdmin/Sidebar/Departmentsidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const userGroup = localStorage.getItem("user_group");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const isAuthRoute = location.pathname === "/login";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: darkMode ? "#0a1929" : "#f5f5f5",
          transition: "background-color 0.5s ease-in-out",
        }}
      >
        <div style={{ flex: 1 }}>
          {!isAuthRoute && (
            <>
              <Navbar
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((prev) => !prev)}
              />
              {userGroup === "2" ? (
                <Sidebar darkMode={darkMode} />
              ) : (
                <Departmentsidebar darkMode={darkMode} />
              )}
            </>
          )}

          <div style={{ marginLeft: "70px" }}>
            <AppRoutes darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />
          </div>

          {!isAuthRoute && <Footer darkMode={darkMode} />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
