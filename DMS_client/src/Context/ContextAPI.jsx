import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('access_token');

  // 🔹 1. Fetch all states on load
  const fetchStates = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/admin_web/state_get/');
      setStates(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // 🔹 2. Fetch districts based on selected state
  const fetchDistrictsByState = async (stateId) => {
    if (!stateId) return;
    try {
      const res = await axios.get(`http://127.0.0.1:8000/admin_web/state_get_idwise/${stateId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDistricts(res.data.districts || []); // Adjust based on API response structure
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      fetchDistrictsByState(selectedStateId);
    } else {
      setDistricts([]); // clear if no state selected
    }
  }, [selectedStateId]);

  return (
    <AuthContext.Provider
      value={{
        states,
        districts,
        selectedStateId,
        setSelectedStateId,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
