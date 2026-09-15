import { useCallback, useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { cleanUsername, createSocket, destroySocket } from "@/services/socket";

export type SocketStatus = "idle" | "connecting" | "connected" | "error";

export function useSocket() {
  const ref = useRef<Socket | null>(null);
  const statusRef = useRef<SocketStatus>("idle");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<SocketStatus>("idle");
  const [statusText, setStatusText] = useState("Disconnected");

  const set = useCallback((s: SocketStatus, text: string) => {
    statusRef.current = s;
    setStatus(s);
    setStatusText(text);
  }, []);

  const connect = useCallback(
    (url: string, username: string) => {
      if (
        statusRef.current === "connecting" ||
        statusRef.current === "connected"
      )
        return null;

      const name = cleanUsername(username);
      const s = createSocket(url, name);
      if (!s) return null;

      destroySocket(ref.current);
      ref.current = s;
      setSocket(s);
      set("connecting", "Connecting...");

      s.on("connect", () => {
        set("connected", `Connected as ${name}`);
        s.emit("setUniqueID", name, {});
      });
      s.on("connect_error", (e: Error) =>
        set("error", `Connection error: ${e.message}`),
      );
      s.on("disconnect", (reason: string) => {
        set("idle", `Disconnected: ${reason}`);
        setSocket(null);
      });

      return s;
    },
    [set],
  );

  const disconnect = useCallback(() => {
    destroySocket(ref.current);
    ref.current = null;
    setSocket(null);
    set("idle", "Disconnected");
  }, [set]);

  const send = useCallback((event: string, payload: unknown) => {
    ref.current?.emit(event, payload);
  }, []);

  useEffect(
    () => () => {
      destroySocket(ref.current);
      ref.current = null;
    },
    [],
  );

  return {
    socket,
    status,
    statusText,
    connected: status === "connected",
    connecting: status === "connecting",
    connect,
    disconnect,
    send,
  };
}
