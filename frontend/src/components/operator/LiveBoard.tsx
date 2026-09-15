import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  LIVE_EVENT_LABELS,
  type LiveEvent,
  type LiveEventType,
  type LiveStats,
} from "@/types/live-events";

interface LiveBoardProps {
  events: LiveEvent[];
  stats: LiveStats;
  socketConnected: boolean;
  onClear: () => void;
}

type Filter = LiveEventType | "all";

const FILTERS: Filter[] = [
  "all",
  "chat",
  "gift",
  "like",
  "member",
  "follow",
  "share",
  "social",
];

const BADGE_STYLES: Record<LiveEventType, string> = {
  chat: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  gift: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  like: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  member: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  follow: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  share: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  social: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  roomUser: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  streamEnd: "bg-red-500/15 text-red-600 dark:text-red-400",
  emote: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
  envelope: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  questionNew: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
};

const STATUS_LABELS = {
  live: "LIVE",
  ended: "ENDED",
  connecting: "CONNECTING",
  offline: "OFFLINE",
} as const;

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <div className={cn("text-xl font-bold leading-none", accent)}>
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export function LiveBoard({
  events,
  stats,
  socketConnected,
  onClear,
}: LiveBoardProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [paused, setPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [stuck, setStuck] = useState(false);
  const [newCount, setNewCount] = useState(0);

  const feedRef = useRef<HTMLDivElement>(null);

  const isLive = stats.liveStatus === "live";
  const isConnecting = stats.liveStatus === "connecting";

  const visibleEvents = useMemo(() => {
    const filtered =
      filter === "all"
        ? events
        : events.filter((event) => event.type === filter);

    return paused ? filtered : filtered.slice(-500);
  }, [events, filter, paused]);

  const handleScroll = () => {
    const el = feedRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setStuck(!nearBottom);
    if (nearBottom) setNewCount(0);
  };

  const jumpToBottom = () => {
    const el = feedRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    setStuck(false);
    setNewCount(0);
  };

  useEffect(() => {
    if (!autoScroll || paused) return;

    if (stuck) {
      setNewCount((c) => c + 1);
      return;
    }

    const element = feedRef.current;

    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [visibleEvents.length, autoScroll, paused, stuck]);

  const statusLabel = STATUS_LABELS[stats.liveStatus] ?? STATUS_LABELS.offline;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        <Stat
          label="Viewers"
          value={stats.viewers}
          accent="text-blue-600 dark:text-blue-400"
        />

        <Stat
          label="Likes"
          value={stats.totalLikes}
          accent="text-rose-600 dark:text-rose-400"
        />

        <Stat
          label="Chats"
          value={stats.chatCount}
          accent="text-sky-600 dark:text-sky-400"
        />

        <Stat
          label="Gifts"
          value={stats.giftCount}
          accent="text-amber-600 dark:text-amber-400"
        />

        <Stat
          label="Joins"
          value={stats.memberCount}
          accent="text-emerald-600 dark:text-emerald-400"
        />

        <Stat label="Follows" value={stats.followCount} />
        <Stat label="Shares" value={stats.shareCount} />
      </div>

      <Card className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden py-0">
        <CardHeader className="border-b py-4">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base">Live Board</CardTitle>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                isLive
                  ? "bg-red-500/15 text-red-600 dark:text-red-400"
                  : isConnecting
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : "bg-muted text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full",
                  isLive
                    ? "animate-pulse bg-red-500"
                    : isConnecting
                      ? "animate-pulse bg-amber-500"
                      : "bg-muted-foreground/40",
                )}
              />

              {statusLabel}
            </span>

            {stats.roomId && (
              <span className="text-xs text-muted-foreground">
                room {stats.roomId}
              </span>
            )}

            <span className="text-xs text-muted-foreground">
              · {events.length} events
            </span>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? "Resume" : "Pause"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoScroll((value) => !value)}
              >
                {autoScroll ? "Auto-scroll on" : "Auto-scroll off"}
              </Button>

              <Button variant="ghost" size="sm" onClick={onClear}>
                Clear
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {FILTERS.map((item) => {
              const active = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {item === "all" ? "All" : LIVE_EVENT_LABELS[item]}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="relative min-h-0 flex-1 p-0">
          <div
            ref={feedRef}
            onScroll={handleScroll}
            className="h-[420px] overflow-y-auto p-4 lg:h-[520px]"
          >
            {!socketConnected && events.length === 0 ? (
              <EmptyState
                title="Not connected"
                description="Enter a TikTok username and hit Connect to start the live feed."
              />
            ) : visibleEvents.length === 0 ? (
              <EmptyState
                title={isLive ? "Waiting for live events..." : "No events yet"}
                description={
                  filter === "all"
                    ? "Chat, gifts, likes, joins, follows and shares will appear here."
                    : `No ${LIVE_EVENT_LABELS[
                        filter as LiveEventType
                      ].toLowerCase()} events yet.`
                }
              />
            ) : (
              <ul className="space-y-1.5">
                {visibleEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-start gap-2 rounded-md border border-transparent px-2 py-1.5 text-sm hover:border-border hover:bg-muted/40"
                  >
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                        BADGE_STYLES[event.type],
                      )}
                    >
                      {LIVE_EVENT_LABELS[event.type]}
                    </span>

                    <div className="min-w-0 flex-1">
                      {event.user && (
                        <>
                          <span className="font-medium">{event.user}</span>{" "}
                        </>
                      )}
                      <span className="break-words text-muted-foreground">
                        {event.summary}
                      </span>
                    </div>

                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {event.time}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {stuck && !paused && newCount > 0 && (
            <button
              type="button"
              onClick={jumpToBottom}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg"
            >
              {newCount} new ↓
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
      <p className="font-medium">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
