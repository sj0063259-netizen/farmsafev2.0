function validateSensorData(data) {

    if (!data) {
        return "Request body is missing.";
    }

    const requiredFields = [
        "temperature",
        "humidity",
        "soil",
        "airQuality",
        "battery"
    ];

    for (const field of requiredFields) {
        if (data[field] === undefined) {
            return `Missing field: ${field}`;
        }
    }

    // ==========================
    // Optional Pump Validation
    // ==========================

    if (
        data.pumpStatus !== undefined &&
        typeof data.pumpStatus !== "boolean"
    ) {
        return "pumpStatus must be boolean.";
    }

    if (
        data.mode !== undefined &&
        !["AUTO", "MANUAL"].includes(data.mode)
    ) {
        return "Invalid mode.";
    }

    return null;
}

module.exports = {
    validateSensorData
};