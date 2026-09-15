import { useState, useCallback, useEffect } from "react";
import type { Socket } from "socket.io-client";
import type { LogType } from "./useConsoleLogs";

type AddLogFn = (type: LogType, message: string) => void;

export type LiveInteraction = {
  id: string;
  type: "comment" | "join" | "gift";
  createdAt: string;
  user: { uniqueId: string; nickname: string; avatarUrl?: string };
  comment?: { text: string };
  join?: { action: "joined" };
  gift?: { id?: string; name: string; repeatCount: number; diamondCount?: number };
};

function toText(value: unknown, fallback: string): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;
    const preferred = item.defaultFormat ?? item.defaultPattern ?? item.displayType;
    if (typeof preferred === "string" || typeof preferred === "number") return String(preferred);
  }
  return fallback;
}

function normalizeInteraction(value: LiveInteraction): LiveInteraction {
  return {
    ...value,
    id: toText(value.id, `interaction-${Date.now()}`),
    type: value.type,
    createdAt: toText(value.createdAt, new Date().toISOString()),
    user: {
      ...value.user,
      uniqueId: toText(value.user?.uniqueId, "unknown"),
      nickname: toText(value.user?.nickname, "Unknown viewer"),
    },
    comment: value.comment
      ? { text: toText(value.comment.text, "") }
      : undefined,
    gift: value.gift
      ? {
          ...value.gift,
          name: toText(value.gift.name, "Quà tặng"),
          repeatCount: Number(value.gift.repeatCount) || 1,
        }
      : undefined,
  };
}

interface UseTikTokOptions {
  socket: Socket;
  addLog: AddLogFn;
}

export function useTikTok({ socket, addLog }: UseTikTokOptions) {
  const [username, setUsername] = useState("");
  const [interactions, setInteractions] = useState<LiveInteraction[]>([]);

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

    const onInteraction = (interaction: LiveInteraction) => {
      const safeInteraction = normalizeInteraction(interaction);
      setInteractions((current) => [safeInteraction, ...current].slice(0, 100));
      if (safeInteraction.type === "comment") addLog("info", `[COMMENT] ${safeInteraction.user.nickname}: ${safeInteraction.comment?.text}`);
      if (safeInteraction.type === "join") addLog("info", `[JOIN] ${safeInteraction.user.nickname} entered the room`);
      if (safeInteraction.type === "gift") addLog("success", `[GIFT] ${safeInteraction.user.nickname} sent ${safeInteraction.gift?.name}`);
    };

    const onConnectError = (err: any) => {
      console.log("connect_error:", err);
      addLog("error", `Socket error: ${err?.message || err}`);
    };

    socket.on("tiktokConnected", onTikTokConnected);
    socket.on("tiktokDisconnected", onTikTokDisconnected);
    socket.on("chat", onChat);
    socket.on("liveInteraction", onInteraction);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("tiktokConnected", onTikTokConnected);
      socket.off("tiktokDisconnected", onTikTokDisconnected);
      socket.off("chat", onChat);
      socket.off("liveInteraction", onInteraction);
      socket.off("connect_error", onConnectError);
    };
  }, [socket, username, addLog]);

  return {
    username,
    setUsername,
    handleConnect,
    handleDisconnect,
    interactions,
  };
}

// alias for `useTiktok` casing requested by user
export const useTiktok = useTikTok;
