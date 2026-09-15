export type LiveEventType =
  | "chat"
  | "gift"
  | "like"
  | "member"
  | "follow"
  | "share"
  | "social"
  | "roomUser"
  | "streamEnd"
  | "emote"
  | "envelope"
  | "questionNew";

export interface LiveEvent {
  id: string;
  type: LiveEventType;
  time: string;
  timestamp: number;
  user: string;
  summary: string;
  raw: unknown;
}

export interface LiveStats {
  viewers: number;
  totalLikes: number;
  chatCount: number;
  giftCount: number;
  memberCount: number;
  followCount: number;
  shareCount: number;
  roomId: string;
  liveStatus: "offline" | "connecting" | "live" | "ended";
}

export const LIVE_EVENT_TYPES: LiveEventType[] = [
  "chat",
  "gift",
  "like",
  "member",
  "follow",
  "share",
  "social",
  "roomUser",
  "streamEnd",
  "emote",
  "envelope",
  "questionNew",
];

export const LIVE_EVENT_LABELS: Record<LiveEventType, string> = {
  chat: "Chat",
  gift: "Gift",
  like: "Like",
  member: "Join",
  follow: "Follow",
  share: "Share",
  social: "Social",
  roomUser: "Viewers",
  streamEnd: "Stream End",
  emote: "Emote",
  envelope: "Envelope",
  questionNew: "Q&A",
};

export function createInitialStats(): LiveStats {
  return {
    viewers: 0,
    totalLikes: 0,
    chatCount: 0,
    giftCount: 0,
    memberCount: 0,
    followCount: 0,
    shareCount: 0,
    roomId: "",
    liveStatus: "offline",
  };
}
