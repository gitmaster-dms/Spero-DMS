import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [Tehsils, setTehsils] = useState([]);
  const [Citys, setCitys] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedTehsilId, setSelectedTehsilId] = useState('');
  const [selectedCityID, setSelectedCityId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const port = import.meta.env.VITE_APP_API_KEY;
  const token = localStorage.getItem("access_token");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("access_token"); // fetch latest token each time
    if (!refreshToken) return;

    try {
      const response = await axios.post(`${port}/admin_web/login/refresh/`, {
        refresh: token,
      });

      if (response.data?.access) {
        localStorage.setItem("access_token", response.data.access);
        console.log("✅ Access token refreshed");
        setAccessToken(response.data.access);
      } else {
        console.warn("⚠️ No access token returned during refresh.");
      }
    } catch (error) {
      console.error("❌ Error refreshing access token:", error);
    }
  };

  useEffect(() => {
    refreshAuthToken(); 

    const interval = setInterval(() => {
      refreshAuthToken();
    }, 10 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, []);


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
      const res = await axios.get(`${port}/admin_web/Tahsil_get_idwise/${districtId}/`, {
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


  const fetchCitysByTehshil = async (tehshilId) => {
    if (!tehshilId) return;
    try {
      setLoading(true);
      const res = await axios.get(`${port}/admin_web/City_get_idwise/${tehshilId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Tehsils by district ${tehshilId}:`, res.data);
      setCitys(res.data || []);
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

  // 🔹 useEffect for selectedStateId change
  useEffect(() => {
    if (selectedStateId) {
      fetchDistrictsByState(selectedStateId);
      setSelectedDistrictId('');
      setSelectedTehsilId('');
      setSelectedCityId('');
      setTehsils([]);
      setCitys([]);
    } else {
      setDistricts([]);
      setTehsils([]);
      setCitys([]);
      setSelectedDistrictId('');
      setSelectedTehsilId('');
      setSelectedCityId('');
    }
  }, [selectedStateId]);

  // 🔹 useEffect for selectedDistrictId change
  useEffect(() => {
    if (selectedDistrictId) {
      fetchTehsilsByDistrict(selectedDistrictId);
      setSelectedTehsilId('');
      setSelectedCityId('');
      setCitys([]);
    } else {
      setTehsils([]);
      setCitys([]);
      setSelectedTehsilId('');
      setSelectedCityId('');
    }
  }, [selectedDistrictId]);

  // ✅ useEffect for selectedTehsilId change (fetch cities)
  useEffect(() => {
    if (selectedTehsilId) {
      fetchCitysByTehshil(selectedTehsilId);
      setSelectedCityId('');
    } else {
      setCitys([]);
      setSelectedCityId('');
    }
  }, [selectedTehsilId]);


  return (
    <AuthContext.Provider
      value={{
        states,
        districts,
        Tehsils,
        Citys,
        selectedStateId,
        selectedDistrictId,
        selectedTehsilId,
        selectedCityID,
        setSelectedStateId,
        setSelectedDistrictId,
        setSelectedTehsilId,
        setSelectedCityId,
        loading,
        error,
        accessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};