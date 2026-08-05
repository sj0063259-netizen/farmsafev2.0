import { io } from "socket.io-client";

const socket = io("https://farmsafev2-0.onrender.com", {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;