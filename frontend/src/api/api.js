import axios from "axios";

const API = axios.create({
    baseURL: "https://farmsafev2-0.onrender.com"
});

export const getLatestSensorData = () =>
    API.get("/latest");

export const getHealthStatus = () =>
    API.get("/health");