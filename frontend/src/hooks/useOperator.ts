import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import {
  createInitialStats,
  type LiveEvent,
  type LiveEventType,
  type LiveStats,
} from "@/types/live-events";
import { DEFAULT_SOCKET_URL, cleanUsername } from "@/services/socket";
import { chatText, giftSummary, toEvent } from "@/services/live-events";

export interface ConsoleLog {
  id: number;
  type: "info" | "success" | "error";
  message: string;
  time: string;
}

const DEFAULT_URL = DEFAULT_SOCKET_URL;

export function useOperator() {
  const {
    socket,
    status,
    statusText,
    connected,
    connecting,
    connect,
    disconnect,
  } = useSocket();

  const [username, setUsername] = useState("");
  const [url, setUrl] = useState(DEFAULT_URL);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [stats, setStats] = useState<LiveStats>(createInitialStats());
  const [logs, setLogs] = useState<ConsoleLog[]>([]);

  const addLog = useCallback((type: ConsoleLog["type"], message: string) => {
    setLogs((prev) =>
      [
        ...prev,
        {
          id: Date.now() + Math.random(),
          type,
          message,
          time: new Date().toLocaleTimeString(),
        },
      ].slice(-200),
    );
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);
  const clearEvents = useCallback(() => {
    setEvents([]);
    setStats(createInitialStats());
  }, []);

  const add = useCallback((type: LiveEventType, data: any, summary: string) => {
    setEvents((prev) => [...prev, toEvent(type, data, summary)].slice(-500));
  }, []);

  const inc = useCallback((key: keyof LiveStats, n = 1) => {
    setStats((prev) => ({ ...prev, [key]: (prev[key] as number) + n }));
  }, []);

  const handleConnect = useCallback(() => {
    if (!username.trim()) return addLog("error", "Missing Username");
    if (!url.trim()) return addLog("error", "Missing URL");
    clearEvents();
    clearLogs();
    setTiktokConnected(false);
    setRoomId("");
    setStats({ ...createInitialStats(), liveStatus: "connecting" });
    addLog("info", `Connecting to ${cleanUsername(username)}...`);
    connect(url, username);
  }, [username, url, connect, clearEvents, clearLogs, addLog]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setTiktokConnected(false);
    setRoomId("");
    setStats((prev) => ({ ...prev, liveStatus: "offline" }));
    addLog("info", "Disconnected");
  }, [disconnect, addLog]);

  useEffect(() => {
    if (!socket) return;

    const onConnectError = (e: Error) =>
      addLog("error", `Socket error: ${e.message}`);
    const onDisconnect = () => {
      setTiktokConnected(false);
      setStats((prev) => ({ ...prev, liveStatus: "offline" }));
    };
    const onTiktokConnected = (s: any) => {
      setTiktokConnected(true);
      setRoomId(String(s?.roomId ?? ""));
      setStats((prev) => ({
        ...createInitialStats(),
        roomId: String(s?.roomId ?? ""),
        liveStatus: "live",
      }));
      addLog("success", `TikTok connected roomId=${s?.roomId ?? ""}`);
    };
    const onTiktokDisconnected = (r: string) => {
      setTiktokConnected(false);
      setStats((prev) => ({ ...prev, liveStatus: "connecting" }));
      addLog("error", `TikTok disconnected: ${r ?? ""}`);
    };

    const onChat = (d: any) => {
      add("chat", d, chatText(d));
      inc("chatCount");
    };
    const onGift = (d: any) => {
      // simple dedup: backend sends streak packets with repeatEnd=false
      if (d?.repeatEnd === false) return;
      const { text, count } = giftSummary(d);
      add("gift", d, text);
      inc("giftCount", count);
    };
    const onLike = (d: any) =>
      inc(
        "totalLikes",
        Number(d?.likeCount ?? d?.count ?? d?.totalLikeCount ?? 1) || 1,
      );
    const onMember = (d: any) => {
      add("member", d, "joined the LIVE");
      inc("memberCount");
    };
    const onFollow = (d: any) => {
      add("follow", d, "followed the host");
      inc("followCount");
    };
    const onShare = (d: any) => {
      add("share", d, "shared the LIVE");
      inc("shareCount");
    };
    const onSocial = (d: any) => {
      const t = String(d?.displayType ?? d?.label ?? "").toLowerCase();
      if (t.includes("follow")) {
        add("follow", d, "followed the host");
        inc("followCount");
        return;
      }
      if (t.includes("share")) {
        add("share", d, "shared the LIVE");
        inc("shareCount");
        return;
      }
      add("social", d, String(d?.displayType ?? d?.label ?? "social event"));
    };
    const onRoomUser = (d: any) => {
      const v = Number(
        d?.viewerCount ??
          d?.userCount ??
          d?.totalUser ??
          d?.common?.userCount ??
          0,
      );
      setStats((prev) => ({ ...prev, viewers: v }));
    };
    const onEmote = (d: any) =>
      add("emote", d, `sent ${d?.emote?.emoteId ?? d?.emoteId ?? "emote"}`);
    const onEnvelope = (d: any) => add("envelope", d, "sent an envelope");
    const onQuestion = (d: any) =>
      add(
        "questionNew",
        d,
        String(d?.questionText ?? d?.text ?? "asked a question"),
      );
    const onStreamEnd = () => {
      add("streamEnd", {}, "stream ended");
      setStats((prev) => ({ ...prev, liveStatus: "ended" }));
    };

    const handlers = {
      connect_error: onConnectError,
      disconnect: onDisconnect,
      tiktokConnected: onTiktokConnected,
      tiktokDisconnected: onTiktokDisconnected,
      chat: onChat,
      gift: onGift,
      like: onLike,
      member: onMember,
      follow: onFollow,
      share: onShare,
      social: onSocial,
      roomUser: onRoomUser,
      emote: onEmote,
      envelope: onEnvelope,
      questionNew: onQuestion,
      streamEnd: onStreamEnd,
    } as const;

    for (const [e, fn] of Object.entries(handlers)) socket.on(e, fn as any);
    return () => {
      for (const [e, fn] of Object.entries(handlers)) socket.off(e, fn as any);
    };
  }, [socket, add, inc, addLog]);

  return {
    username,
    setUsername,
    url,
    setUrl,
    status,
    statusText,
    connected,
    connecting,
    tiktokConnected,
    roomId,
    logs,
    clearLogs,
    events,
    stats,
    clearEvents,
    handleConnect,
    handleDisconnect,
  };
}
