import axios from "axios";

const api = axios.create({
  baseURL: "https://farmsafev2-0.onrender.com",
  timeout: 5000,
});

// Get latest sensor data
export const getLatestData = async () => {
  try {
    const response = await api.get("/latest");
    return response.data;
  } catch (error) {
    console.error("Error fetching latest sensor data:", error);
    return null;
  }
};

// Check backend health
export const getHealthStatus = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("Backend is not reachable:", error);
    return null;
  }
};

export default api;