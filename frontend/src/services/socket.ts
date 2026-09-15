import { io, type Socket } from "socket.io-client";

export const DEFAULT_SOCKET_URL = "ws://localhost:3001";

export const cleanUsername = (v: string) => v.trim() || "Anonymous";

export function createSocket(url: string, username: string): Socket | null {
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;
  return io(cleanUrl, {
    transports: ["websocket", "polling"],
    reconnection: false,
    auth: { username: cleanUsername(username) },
  });
}

export function destroySocket(s: Socket | null) {
  s?.removeAllListeners();
  s?.disconnect();
}
