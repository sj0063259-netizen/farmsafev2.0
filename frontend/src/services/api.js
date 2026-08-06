import axios from "axios";

const api = axios.create({
  baseURL: "https://farmsafev2-0.onrender.com/api",
  timeout: 5000,
});

// =============================
// Latest Sensor Data
// =============================
export const getLatestData = async () => {
  try {
    const response = await api.get("/latest");
    return response.data;
  } catch (error) {
    console.error("Error fetching latest sensor data:", error);
    return null;
  }
};

// =============================
// Health Check
// =============================
export const getHealthStatus = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("Backend is not reachable:", error);
    return null;
  }
};

// =============================
// Pump Control
// =============================
export const controlPump = async (action, mode) => {
  try {
    const response = await api.post("/pump", {
      action,
      mode,
    });

    return response.data;
  } catch (error) {
    console.error("Pump control failed:", error);
    return null;
  }
};

export default api;