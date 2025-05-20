import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [Tehsils, setTehsils] = useState([]);
  
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedTehsilId, setSelectedTehsilId] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const port = import.meta.env.VITE_APP_API_KEY;
  const token = localStorage.getItem("access_token");

  // 🔹 1. Fetch all states on load
  const fetchStates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${port}/admin_web/state_get/`);
      setStates(res.data);
    } catch (err) {
      console.error("Error fetching states:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 2. Fetch districts based on selected state
  const fetchDistrictsByState = async (stateId) => {
    if (!stateId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${port}/admin_web/district_get_idwise/${stateId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Districts by state ${stateId}:`, res.data);
      setDistricts(res.data || []);
    } catch (err) {
      console.error("Error fetching districts:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 3. Fetch tehsils based on selected district
  const fetchTehsilsByDistrict = async (districtId) => {
    if (!districtId) return;
    try {
      setLoading(true);
      const res = await axios.get(`${port}/admin_web/Tahsil_get/${districtId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Tehsils by district ${districtId}:`, res.data);
      setTehsils(res.data || []);
    } catch (err) {
      console.error("Error fetching tehsils:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Effects
  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      fetchDistrictsByState(selectedStateId);
      // Reset dependent dropdowns when state changes
      setSelectedDistrictId('');
      setSelectedTehsilId('');
      setTehsils([]);
    } else {
      setDistricts([]);
      setSelectedDistrictId('');
      setSelectedTehsilId('');
      setTehsils([]);
    }
  }, [selectedStateId]);

  useEffect(() => {
    if (selectedDistrictId) {
      fetchTehsilsByDistrict(selectedDistrictId);
      // Reset tehsil when district changes
      setSelectedTehsilId('');
    } else {
      setTehsils([]);
      setSelectedTehsilId('');
    }
  }, [selectedDistrictId]);

  return (
    <AuthContext.Provider
      value={{
        states,
        districts,
        Tehsils,
        selectedStateId,
        selectedDistrictId,
        selectedTehsilId,
        setSelectedStateId,
        setSelectedDistrictId,
        setSelectedTehsilId,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};