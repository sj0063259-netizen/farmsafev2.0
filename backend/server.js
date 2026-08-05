require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const {
    saveSensorData,
    getLatestData
} = require("./database");

const {
    validateSensorData
} = require("./utils");
const {
    initializeSocket,
    sendSensorData,
} = require("./socket");
const app = express();
const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 5000;
// ======================================
// Pump Controller
// ======================================

let pumpState = {
    action: "OFF",
    mode: "AUTO",
    relayStatus: false,
    lastHeartbeat: null,
    updatedAt: null,
};

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "*"
}));

app.use(express.json());

// ============================
// Health Check
// ============================
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "FarmSafe Backend is Running 🚀"
    });
});

// ============================
// Receive Sensor Data
// ============================
app.post("/api/sensor", (req, res) => {

    console.log("Body received:", req.body);

    const sensorData = req.body;
    // Update live pump information from ESP32
if (sensorData.pumpStatus !== undefined) {
    pumpState.relayStatus = sensorData.pumpStatus;
}

if (sensorData.mode) {
    pumpState.mode = sensorData.mode;
}

pumpState.lastHeartbeat = new Date().toISOString();

    const error = validateSensorData(sensorData);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }

    saveSensorData(sensorData, function(err) {

        if (err) {
          console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to save sensor data."
            });
        }

        console.log("📡 Sensor Data Received:");
        console.table(sensorData);
sendSensorData(sensorData);
        res.status(201).json({
            success: true,
            message: "Sensor data saved successfully."
        });

    });

});

// ============================
// Get Latest Sensor Data
// ============================
app.get("/api/latest", (req, res) => {

    getLatestData((err, row) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: "No sensor data available."
            });
        }

   res.json({
    success: true,
    data: {
        ...row,
        pumpStatus: pumpState.relayStatus,
        mode: pumpState.mode,
        lastHeartbeat: pumpState.lastHeartbeat
    }
});

    });

});

// ============================
// Home Route
// ============================
app.get("/", (req, res) => {

    res.send("🌱 FarmSafe Backend Running");

});

// ============================
// Start Server
// ============================
// ============================
// Pump Control
// ============================

app.post("/api/pump", (req, res) => {

    const { action, mode } = req.body;

    if (!["ON", "OFF"].includes(action)) {
        return res.status(400).json({
            success: false,
            message: "Invalid pump action."
        });
    }

 pumpState.action = action;
pumpState.mode = mode;
pumpState.updatedAt = new Date().toISOString();

    console.log("💧 Pump Command Updated");
    console.table(pumpState);

    res.json({
        success: true,
        message: `Pump ${action}`,
        pumpState
    });

});
// ============================
// ESP32 Reads Pump Status
// ============================

app.get("/api/pump-status", (req, res) => {

    res.json({
        success: true,
        action: pumpState.action,
        mode: pumpState.mode
    });

});

// ============================
// Live Simulator
// ============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
server.listen(PORT, () => {

    console.log("===================================");
    console.log("🌱 FarmSafe Backend Started");
    console.log(`🚀 Server : http://localhost:${PORT}`);
    console.log("===================================");

});