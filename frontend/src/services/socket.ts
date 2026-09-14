import { io, type Socket } from "socket.io-client";

const SOCKET_URL = "ws://localhost:3001";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
