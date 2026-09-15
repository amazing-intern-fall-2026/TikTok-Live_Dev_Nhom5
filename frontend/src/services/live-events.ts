import type { LiveEvent, LiveEventType } from "@/types/live-events";

const pick = (...vals: unknown[]): string => {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
};

export const userOf = (d: any): string =>
  pick(
    d?.uniqueId,
    d?.username,
    d?.nickname,
    d?.displayName,
    d?.user?.uniqueId,
    d?.user?.username,
    d?.user?.nickname,
    d?.user?.displayName,
    d?.sender?.uniqueId,
    d?.sender?.nickname,
    d?.from?.uniqueId,
    d?.from?.nickname,
  );

export const toEvent = (
  type: LiveEventType,
  data: any,
  summary: string,
): LiveEvent => ({
  id: crypto.randomUUID(),
  type,
  time: new Date().toLocaleTimeString(),
  timestamp: Date.now(),
  user: userOf(data),
  summary,
  raw: data,
});

export const chatText = (d: any) => String(d?.comment ?? d?.content ?? "");

export const giftSummary = (d: any) => {
  const n = Number(d?.repeatCount ?? d?.count ?? 1) || 1;
  const name = d?.giftName ?? d?.gift?.name ?? "gift";
  return { text: `${name} x${n}`, count: n };
};
