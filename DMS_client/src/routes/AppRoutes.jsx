// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../Componenets/Login/Login";
import Sop from "../Componenets/DispatchModule/SOP/Sop";
import AlertPanel from "../Componenets/DispatchModule/AlertPanel/AlertPanel";
import AddDepartment from "../Componenets/SuperAdmin/System/Department/AddDepartment";
import AddGroup from "../Componenets/SuperAdmin/System/Groups/Add_group";
import AddEmployee from "../Componenets/SuperAdmin/System/Employee_reg/Add_employee";

const AppRoutes = ({ darkMode, setIsLoggedIn }) => {
  return (
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
        path="/add-department"
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
  );
};

export default AppRoutes;
