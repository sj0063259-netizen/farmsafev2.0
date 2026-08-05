import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getLatestData } from "../services/api";
import socket from "../services/socket";

const SensorContext = createContext();

const SOIL_THRESHOLD = 55;

function getPumpStatus(soil) {
  if (soil == null) return false;

  if (soil < 0 || soil > 100) return false;

  return soil < SOIL_THRESHOLD;
}

export function SensorProvider({ children }) {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    soil: null,
    airQuality: null,
    battery: null,

    pumpStatus: false,
    mode: "AUTO",

    connected: false,
    lastUpdated: null,

    history: [],
  });

  useEffect(() => {
    async function loadLatestData() {
      try {
        const response = await getLatestData();

        if (!response?.success) return;

        const latestData = response.data;
        const currentTime = new Date().toLocaleTimeString();

        setSensorData((prev) => ({
          ...prev,
          ...latestData,

          // AUTO mode decides initial pump state
          pumpStatus: getPumpStatus(latestData.soil),

          connected: true,
          lastUpdated: currentTime,

          history: [
            {
              ...latestData,
              time: currentTime,
            },
          ],
        }));
      } catch (err) {
        console.error(err);
      }
    }

    loadLatestData();

    socket.on("sensorData", (data) => {
      const currentTime = new Date().toLocaleTimeString();

      setSensorData((prev) => {
        const soil =
          data.soil == null ||
          data.soil < 0 ||
          data.soil > 100
            ? prev.soil
            : data.soil;

        return {
          ...prev,
          ...data,
          soil,

          // AUTO controls pump
          // MANUAL keeps user's last selection
          pumpStatus:
            prev.mode === "AUTO"
              ? getPumpStatus(soil)
              : prev.pumpStatus,

          connected: true,
          lastUpdated: currentTime,

          history: [
            ...prev.history,
            {
              ...data,
              soil,
              time: currentTime,
            },
          ].slice(-20),
        };
      });
    });

    socket.on("connect", () => {
      setSensorData((prev) => ({
        ...prev,
        connected: true,
      }));
    });

    socket.on("disconnect", () => {
      setSensorData((prev) => ({
        ...prev,
        connected: false,
      }));
    });

    return () => {
      socket.off("sensorData");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // ==========================
  // MODE CHANGE
  // ==========================
  const setMode = (mode) => {
    setSensorData((prev) => ({
      ...prev,
      mode,

      // When returning to AUTO,
      // immediately calculate pump status
      pumpStatus:
        mode === "AUTO"
          ? getPumpStatus(prev.soil)
          : prev.pumpStatus,
    }));
  };

  // ==========================
  // MANUAL PUMP CONTROL
  // ==========================
  const setPumpStatus = (status) => {
    setSensorData((prev) => ({
      ...prev,
      pumpStatus: status,
    }));
  };

  return (
    <SensorContext.Provider
      value={{
        ...sensorData,
        setMode,
        setPumpStatus,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
}

export function useSensor() {
  return useContext(SensorContext);
}