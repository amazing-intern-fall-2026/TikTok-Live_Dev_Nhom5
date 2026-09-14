import { useState, useCallback, useEffect } from "react";
import type { Socket } from "socket.io-client";
import type { LogType } from "./useConsoleLogs";

type AddLogFn = (type: LogType, message: string) => void;

interface UseTikTokOptions {
  socket: Socket;
  addLog: AddLogFn;
}

export function useTikTok({ socket, addLog }: UseTikTokOptions) {
  const [username, setUsername] = useState("");

  const handleConnect = useCallback(() => {
    if (!username.trim()) {
      addLog("error", "Missing Username");
      return;
    }

    if (!socket.connected) socket.connect();

    const cleanId = username.trim().replace(/^@/, "");
    addLog("info", `Connecting to @${cleanId}...`);
    socket.emit("setUniqueID", cleanId, {});
  }, [username, socket, addLog]);

  const handleDisconnect = useCallback(() => {
    socket.disconnect();
    addLog("info", `Disconnected: @${username}`);
  }, [socket, username, addLog]);

  useEffect(() => {
    const onTikTokConnected = (state: any) => {
      console.log("tiktokConnected:", state);
      addLog("success", `TikTok connected: @${username} roomId=${state?.roomId ?? ""}`);
    };

    const onTikTokDisconnected = (reason: string) => {
      console.log("tiktokDisconnected:", reason);
      addLog("error", `TikTok disconnected: ${reason}`);
    };

    const onChat = (data: any) => {
      console.log("chat:", data);
      const name = data.uniqueId || data.username || "unknown";
      const comment = data.comment || data.content || JSON.stringify(data);
      addLog("info", `[CHAT] ${name}: ${comment}`);
    };

    const onConnectError = (err: any) => {
      console.log("connect_error:", err);
      addLog("error", `Socket error: ${err?.message || err}`);
    };

    socket.on("tiktokConnected", onTikTokConnected);
    socket.on("tiktokDisconnected", onTikTokDisconnected);
    socket.on("chat", onChat);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("tiktokConnected", onTikTokConnected);
      socket.off("tiktokDisconnected", onTikTokDisconnected);
      socket.off("chat", onChat);
      socket.off("connect_error", onConnectError);
    };
  }, [socket, username, addLog]);

  return {
    username,
    setUsername,
    handleConnect,
    handleDisconnect,
  };
}

// alias for `useTiktok` casing requested by user
export const useTiktok = useTikTok;
