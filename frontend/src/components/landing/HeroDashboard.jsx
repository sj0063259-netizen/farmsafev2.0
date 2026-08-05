import DashboardHeader from "./DashboardHeader";
import DashboardChart from "./DashboardChart";
import SensorCards from "./SensorCards";

import {
  Bot,
  Power,
  Clock,
  BatteryCharging,
  Sprout,
} from "lucide-react";

import { useSensor } from "../../context/SensorContext";

export default function HeroDashboard() {
  const {
    mode,
    setMode,
    pumpStatus,
    setPumpStatus,
    ...sensorData
  } = useSensor();

  const battery = sensorData.battery;
  const lastUpdated = sensorData.lastUpdated ?? "--:--:--";

  const API =
    import.meta.env.VITE_API_URL ||
    "https://farmsafev2-0.onrender.com";

  const soilCondition =
    sensorData.soil == null
      ? "Waiting..."
      : sensorData.soil < 35
      ? "Dry"
      : sensorData.soil <= 70
      ? "Optimal"
      : "Wet";

  const irrigationAction =
    !sensorData.connected
      ? "Waiting for Sensor Data"
      : mode === "AUTO"
      ? pumpStatus
        ? "Automatic Irrigation Running"
        : "Monitoring Soil"
      : pumpStatus
      ? "Pump Running (Manual)"
      : "Manual Control Enabled";

  const controlPump = async (action) => {
    try {
      const response = await fetch(`${API}/api/pump`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          mode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPumpStatus(action === "ON");
      }

      console.log(data);
    } catch (err) {
      console.error("Pump Control Error:", err);
    }
  };

  return (
    <section
      id="dashboard"
      className="mx-auto mt-20 max-w-4xl overflow-hidden rounded-[32px] border border-slate-700/80 bg-[#111827]/90 backdrop-blur-2xl shadow-[0_25px_80px_rgba(34,197,94,0.12)]"
    >
      <div className="p-6 lg:p-8">
        <DashboardHeader />

        <div className="mt-6">
          <SensorCards />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-700 bg-[#0F172A] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-2">
              <Bot className="text-green-400" size={22} />

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Smart Irrigation Controller
                </h3>

                <p className="text-sm text-slate-400">
                  Automatic & Manual Pump Control
                </p>
              </div>
            </div>

            <div className="flex overflow-hidden rounded-xl border border-slate-600">

              <button
                onClick={() => setMode("AUTO")}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  mode === "AUTO"
                    ? "bg-violet-600 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                AUTO
              </button>

              <button
                onClick={() => setMode("MANUAL")}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  mode === "MANUAL"
                    ? "bg-violet-600 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                MANUAL
              </button>

            </div>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-800/40 p-4">

              <div className="flex items-center gap-2">
                <Power
                  size={20}
                  className={
                    pumpStatus
                      ? "text-green-400"
                      : "text-slate-500"
                  }
                />

                <span className="text-slate-300">
                  Pump Status
                </span>

              </div>

              <p
                className={`mt-3 text-xl font-bold ${
                  pumpStatus
                    ? "text-green-400"
                    : "text-slate-400"
                }`}
              >
                {pumpStatus ? "Running" : "Standby"}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-800/40 p-4">

              <div className="flex items-center gap-2">
                <Sprout
                  className="text-green-400"
                  size={20}
                />

                <span className="text-slate-300">
                  Soil Condition
                </span>

              </div>

              <p className="mt-3 text-xl font-bold text-white">
                {soilCondition}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-800/40 p-4">

              <div className="flex items-center gap-2">
                <Bot
                  className="text-cyan-400"
                  size={20}
                />

                <span className="text-slate-300">
                  Current Action
                </span>

              </div>

              <p className="mt-3 text-lg font-semibold text-cyan-400">
                {irrigationAction}
              </p>

            </div>

            <div className="rounded-2xl bg-slate-800/40 p-4">

              <div className="flex items-center gap-2">
                <BatteryCharging
                  className="text-yellow-400"
                  size={20}
                />

                <span className="text-slate-300">
                  Battery
                </span>

              </div>

              <p className="mt-3 text-xl font-bold text-white">
                {battery ?? "--"}%
              </p>

            </div>

          </div>

          {mode === "MANUAL" && (

            <div className="mt-8">

              <h4 className="mb-4 font-semibold text-white">
                Manual Pump Controls
              </h4>

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() => controlPump("ON")}
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Start Pump
                </button>

                <button
                  onClick={() => controlPump("OFF")}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Stop Pump
                </button>

              </div>

            </div>

          )}

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <Clock size={16} />
            Last Updated : {lastUpdated}
          </div>

        </div>

        <div className="mt-8">
          <DashboardChart />
        </div>

      </div>
    </section>
  );
}