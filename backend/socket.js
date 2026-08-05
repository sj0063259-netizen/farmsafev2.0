const { Server } = require("socket.io");

let io;

function initializeSocket(server) {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        console.log(`🟢 Client Connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`🔴 Client Disconnected: ${socket.id}`);
        });

    });

}

// =========================
// Live Sensor Updates
// =========================

function sendSensorData(data) {

    if (io) {
        io.emit("sensorData", data);
    }

}

module.exports = {
    initializeSocket,
    sendSensorData
};