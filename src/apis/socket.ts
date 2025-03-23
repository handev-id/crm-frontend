// socket.ts
import { io } from "socket.io-client";

const baseURL = `${import.meta.env.VITE_BASE_URL}`
const socket = io("http://192.168.0.109:3333", {
    transports: ["websocket"]
});
export default socket;