import {
  Sprout,
  Thermometer,
  Droplets,
  Wind,
  Wifi,
  WifiOff,
  Calendar,
  Clock3,
  Mountain,
} from "lucide-react";

function getStatusColor(status) {
  switch (status) {
    case "Optimal":
    case "Good":
      return "text-green-400";

    case "Slightly Low":
    case "Slightly High":
      return "text-yellow-400";

    case "Low":
    case "High":
    case "Poor":
      return "text-red-400";

    default:
      return "text-slate-400";
  }
}

function CropOverview({ crop, sensor, analysis }) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {/* ==========================
            Crop Information
      ========================== */}

      <div className="rounded-2xl bg-[#1E293B] border border-slate-700 p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold text-white">
            🌾 Selected Crop
          </h2>

          {sensor.connected ? (
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <Wifi size={18} />
              Online
            </span>
          ) : (
            <span className="flex items-center gap-2 text-red-400 text-sm">
              <WifiOff size={18} />
              Offline
            </span>
          )}

        </div>

        <div className="mt-8 text-center">

          <div className="text-6xl">
            {crop.emoji}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-green-400">
            {crop.name}
          </h1>

          <p className="mt-2 text-slate-400">
            {crop.description}
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <div className="flex justify-between">

            <span className="flex items-center gap-2 text-slate-400">
              <Calendar size={18} />
              Season
            </span>

            <span className="text-white">
              {crop.season}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2 text-slate-400">
              <Clock3 size={18} />
              Duration
            </span>

            <span className="text-white">
              {crop.duration}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2 text-slate-400">
              <Mountain size={18} />
              Soil Type
            </span>

            <span className="text-white">
              {crop.soilType}
            </span>

          </div>

        </div>
      </div>
            {/* ==========================
            Live Sensor Comparison
      ========================== */}

      <div className="rounded-2xl bg-[#1E293B] border border-slate-700 p-6">

        <h2 className="text-xl font-semibold text-white">
          📡 Live Farm Sensors
        </h2>

        <div className="mt-8 space-y-8">

          {/* Temperature */}

          <div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-white">
                <Thermometer size={18} />
                Temperature
              </div>

              <span
                className={`font-semibold ${
                  getStatusColor(
                    analysis?.status?.temperature?.status
                  )
                }`}
              >
                {analysis?.status?.temperature?.status}
              </span>

            </div>

            <div className="mt-3 flex justify-between text-sm">

              <span className="text-slate-400">
                Current
              </span>

              <span className="text-green-400">
                {sensor.connected
                  ? `${sensor.temperature}°C`
                  : "--"}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-slate-400">
                Ideal
              </span>

              <span className="text-white">
                {crop.idealConditions.temperature.min}°C -
                {crop.idealConditions.temperature.max}°C
              </span>

            </div>

          </div>

          <hr className="border-slate-700" />

          {/* Humidity */}

          <div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-white">
                <Droplets size={18} />
                Humidity
              </div>

              <span
                className={`font-semibold ${
                  getStatusColor(
                    analysis?.status?.humidity?.status
                  )
                }`}
              >
                {analysis?.status?.humidity?.status}
              </span>

            </div>

            <div className="mt-3 flex justify-between text-sm">

              <span className="text-slate-400">
                Current
              </span>

              <span className="text-green-400">
                {sensor.connected
                  ? `${sensor.humidity}%`
                  : "--"}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-slate-400">
                Ideal
              </span>

              <span className="text-white">
                {crop.idealConditions.humidity.min}% -
                {crop.idealConditions.humidity.max}%
              </span>

            </div>

          </div>

          <hr className="border-slate-700" />

          {/* Soil */}

          <div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-white">
                <Sprout size={18} />
                Soil Moisture
              </div>

              <span
                className={`font-semibold ${
                  getStatusColor(
                    analysis?.status?.soil?.status
                  )
                }`}
              >
                {analysis?.status?.soil?.status}
              </span>

            </div>

            <div className="mt-3 flex justify-between text-sm">

              <span className="text-slate-400">
                Current
              </span>

              <span className="text-green-400">
                {sensor.connected
                  ? `${sensor.soil}%`
                  : "--"}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-slate-400">
                Ideal
              </span>

              <span className="text-white">
                {crop.idealConditions.soilMoisture.min}% -
                {crop.idealConditions.soilMoisture.max}%
              </span>

            </div>

          </div>

          <hr className="border-slate-700" />

          {/* Air Quality */}

          <div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-white">
                <Wind size={18} />
                Air Quality
              </div>

              <span
                className={`font-semibold ${
                  getStatusColor(
                    analysis?.status?.air?.status
                  )
                }`}
              >
                {analysis?.status?.air?.status}
              </span>

            </div>

            <div className="mt-3 flex justify-between text-sm">

              <span className="text-slate-400">
                Current
              </span>

              <span className="text-green-400">
                {sensor.connected
                  ? sensor.airQuality
                  : "--"}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-slate-400">
                Ideal
              </span>

              <span className="text-white">
                AQI &lt; {crop.idealConditions.airQuality.max}
              </span>

            </div>

          </div>

        </div>

      </div>
            {/* ==========================
            Health Score & AI Advisor
      ========================== */}

      <div className="rounded-2xl bg-[#1E293B] border border-slate-700 p-6">

        <h2 className="text-xl font-semibold text-white">
          🤖 FarmSafe AI Advisor
        </h2>

        {!sensor.connected ? (

          <div className="flex flex-col items-center justify-center h-full py-20">

            <WifiOff size={70} className="text-red-400" />

            <h2 className="mt-6 text-2xl font-bold text-red-400">
              Sensor Offline
            </h2>

            <p className="mt-2 text-center text-slate-400">
              Waiting for ESP32 to connect...
            </p>

          </div>

        ) : (

          <>

            {/* Health Score */}

            <div className="mt-8 text-center">

              <p className="text-slate-400">
                Crop Health Score
              </p>

              <h1 className="mt-2 text-6xl font-bold text-green-400">
                {analysis.healthScore}%
              </h1>

            </div>

            {/* Progress Bar */}

            <div className="mt-8">

              <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

                <div
                  className="h-4 rounded-full bg-green-500 transition-all duration-700"
                  style={{
                    width: `${analysis.healthScore}%`,
                  }}
                />

              </div>

            </div>

            {/* Overall Status */}

            <div className="mt-6 text-center">

              <span
                className={`text-lg font-semibold ${getStatusColor(
                  analysis.status.overall
                )}`}
              >
                {analysis.status.overall}
              </span>

            </div>

            {/* AI Summary */}

            <div className="mt-8 rounded-xl bg-slate-800 p-5">

              <h3 className="text-lg font-semibold text-green-400">

                🤖 AI Recommendation

              </h3>

              <p className="mt-3 leading-7 text-slate-300">

                {analysis.summary}

              </p>

            </div>

            {/* Suggested Actions */}

            <div className="mt-8">

              <h3 className="text-lg font-semibold text-white mb-4">

                📋 Recommended Actions

              </h3>

              <div className="space-y-3">

                {analysis.actions.length > 0 ? (

                  analysis.actions.map((item, index) => (

                    <div
                      key={index}
                      className="rounded-lg bg-slate-800 p-3 text-slate-300"
                    >

                      ✅ {item}

                    </div>

                  ))

                ) : (

                  <div className="rounded-lg bg-green-900/30 border border-green-700 p-3 text-green-300">

                    🎉 No action required. Crop conditions are excellent.

                  </div>

                )}

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default CropOverview;