// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./PrivateRoute";

// Lazy loaded components
const Login = lazy(() => import("../Componenets/Login/Login"));
const Sop = lazy(() => import("../Componenets/DispatchModule/SOP/Sop"));
const AlertPanel = lazy(() => import("../Componenets/DispatchModule/AlertPanel/AlertPanel"));
const AddDepartment = lazy(() => import("../Componenets/SuperAdmin/System/Department/AddDepartment"));
const AddGroup = lazy(() => import("../Componenets/SuperAdmin/System/Groups/Add_group"));
const AddEmployee = lazy(() => import("../Componenets/SuperAdmin/System/Employee_reg/Add_employee"));

const AppRoutes = ({ darkMode, setIsLoggedIn }) => {
  return (
    <Suspense
      fallback={
        <div
         style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
       backgroundColor: darkMode ? "#0a1929" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
        fontFamily: "Arial, sans-serif",
        animation: "fadeIn 1s ease-in-out",
      }}
        >
         <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "10px" }}>
        DMS<span style={{ color: "#1976d2" }}>.....</span>
      </div>
      <div
        style={{
          border: "4px solid #e0e0e0",
          borderTop: "4px solid #1976d2",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
        }}
      ></div>|
       <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Routes */}
        <Route
          path="/sop"
          element={
            <PrivateRoute>
              <Sop darkMode={darkMode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/alert-panel"
          element={
            <PrivateRoute>
              <AlertPanel darkMode={darkMode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/department"
          element={
            <PrivateRoute>
              <AddDepartment darkMode={darkMode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-group"
          element={
            <PrivateRoute>
              <AddGroup darkMode={darkMode} />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <PrivateRoute>
              <AddEmployee darkMode={darkMode} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
