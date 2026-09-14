import { io, type Socket } from "socket.io-client";

const SOCKET_URL = "";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
