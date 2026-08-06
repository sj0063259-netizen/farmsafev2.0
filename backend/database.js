const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./farmsafe.db", (err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to SQLite database");
    }
});

// Create table if it doesn't exist
db.serialize(() => {

    db.run(`
        ALTER TABLE sensor_data
        ADD COLUMN pumpStatus INTEGER DEFAULT 0
    `, (err) => {
        if (err && !err.message.includes("duplicate column")) {
            console.error(err.message);
        }
    });

    db.run(`
        ALTER TABLE sensor_data
        ADD COLUMN mode TEXT DEFAULT 'AUTO'
    `, (err) => {
        if (err && !err.message.includes("duplicate column")) {
            console.error(err.message);
        }
    });

});

// Save sensor data
function saveSensorData(data, callback) {
    const query = `
        INSERT INTO sensor_data
        (temperature, humidity, soil, airQuality, battery, pumpStatus, mode)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [
            data.temperature,
            data.humidity,
            data.soil,
            data.airQuality,
            data.battery,
            Boolean(data.pumpStatus),
            data.mode ?? "AUTO"
        ],
        callback
    );
}

// Get latest sensor data
function getLatestData(callback) {
    db.get(
        `SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1`,
        callback
    );
}

module.exports = {
    saveSensorData,
    getLatestData
};