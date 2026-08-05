import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getLatestData } from "../services/api";
import socket from "../services/socket";

const SensorContext = createContext();

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

        setSensorData(prev => ({

          ...prev,

          ...latestData,

          pumpStatus: latestData.pumpStatus ?? false,

          mode: latestData.mode ?? "AUTO",

          // Only online if actual sensor values exist
          connected:
            latestData.temperature != null &&
            latestData.humidity != null,

          lastUpdated: currentTime,

          history: [

            {

              ...latestData,

              time: currentTime

            }

          ]

        }));

      }

      catch (err) {

        console.error(err);

      }

    }

    loadLatestData();

    socket.on("sensorData", (data) => {

      const currentTime = new Date().toLocaleTimeString();

      setSensorData(prev => {

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

          pumpStatus:

            data.pumpStatus ?? prev.pumpStatus,

          mode:

            data.mode ?? prev.mode,

          connected:

            data.temperature != null &&

            data.humidity != null,

          lastUpdated: currentTime,

          history: [

            ...prev.history,

            {

              ...data,

              soil,

              time: currentTime

            }

          ].slice(-20)

        };

      });

    });

    socket.on("connect", () => {

      console.log("🟢 Connected to Backend");

    });

    socket.on("disconnect", () => {

      console.log("🔴 Backend Disconnected");

      setSensorData(prev => ({

        ...prev,

        connected: false

      }));

    });

    return () => {

      socket.off("sensorData");

      socket.off("connect");

      socket.off("disconnect");

    };

  }, []);

  // ==========================
  // MODE
  // ==========================

  const setMode = (mode) => {

    setSensorData(prev => ({

      ...prev,

      mode

    }));

  };

  // ==========================
  // PUMP
  // ==========================

  const setPumpStatus = (status) => {

    setSensorData(prev => ({

      ...prev,

      pumpStatus: status

    }));

  };

  return (

    <SensorContext.Provider

      value={{

        ...sensorData,

        setMode,

        setPumpStatus

      }}

    >

      {children}

    </SensorContext.Provider>

  );

}

export function useSensor() {

  return useContext(SensorContext);

}