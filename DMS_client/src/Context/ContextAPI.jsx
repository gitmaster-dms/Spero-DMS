import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {

  
    return (
    <AuthContext.Provider value={{  }}>
      {children}
    </AuthContext.Provider>
  );
};
