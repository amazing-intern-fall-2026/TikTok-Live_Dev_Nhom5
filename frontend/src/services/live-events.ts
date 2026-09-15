import type { LiveEvent, LiveEventType } from "@/types/live-events";

const pick = (...vals: unknown[]): string => {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
};

export const userOf = (d: any): string =>
  pick(
    // backend format: data.user.{uniqueId,nickname}
    d?.data?.user?.uniqueId,
    d?.data?.user?.nickname,
    d?.data?.user?.displayName,
    d?.data?.user?.username,
    // legacy / direct
    d?.uniqueId,
    d?.unique_id,
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
): LiveEvent => {
  const ts = typeof data?.timestamp === "number" ? data.timestamp : Date.now();
  return {
    id: crypto.randomUUID(),
    type,
    time: new Date(ts).toLocaleTimeString(),
    timestamp: ts,
    user: userOf(data),
    summary,
    raw: data,
  };
};

export const chatText = (d: any) => String(d?.comment ?? d?.content ?? "");

function toRenderableText(value: unknown, fallback = "Quà tặng") {
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;
    const preferred =
      item.defaultFormat ??
      item.defaultPattern ??
      item.displayType ??
      item.name;
    if (typeof preferred === "string" || typeof preferred === "number")
      return String(preferred);
  }
  return fallback;
}

export const giftSummary = (d: any) => {
  const n =
    Number(d?.repeatCount ?? d?.repeat ?? d?.count ?? d?.likeCount ?? 1) || 1;
  const rawName = d?.giftName ?? d?.gift?.name ?? d?.giftName ?? "gift";
  const name = toRenderableText(rawName, "Quà tặng");
  return { text: `${name} x${n}`, count: n, name, rawName };
};
