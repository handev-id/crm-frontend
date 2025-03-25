import { io } from "socket.io-client";

const baseURL = `${import.meta.env.VITE_BASE_URL}`;
const socket = io("http://localhost:3333", {
  transports: ["websocket"],
});
export default socket;
