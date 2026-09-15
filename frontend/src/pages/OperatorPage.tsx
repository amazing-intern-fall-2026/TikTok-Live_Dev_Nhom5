import {
  ArrowDown,
  AtSign,
  ChevronRight,
  CircleHelp,
  Gift,
  MessageCircle,
  Radio,
  Settings2,
  Sparkles,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useOperator } from "@/hooks/useOperator";
import type { LiveEvent } from "@/types/live-events";

const typeMeta = {
  chat: { label: "Bình luận", icon: MessageCircle, color: "coral" },
  member: { label: "Người vào phòng", icon: Users, color: "teal" },
  gift: { label: "Quà tặng", icon: Gift, color: "gold" },
} as const;

type PanelType = keyof typeof typeMeta;

function toDisplayName(user: string, fallback = "Ẩn danh") {
  if (user && user.trim())
    return user.trim().startsWith("@") ? user.trim().slice(1) : user.trim();
  return fallback;
}

function getGiftMeta(raw: any) {
  const pickGiftName = (v: unknown) => {
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      const p = o.defaultFormat ?? o.defaultPattern ?? o.displayType ?? o.name;
      if (typeof p === "string" || typeof p === "number") return String(p);
    }
    return "";
  };
  const name = pickGiftName(raw?.giftName ?? raw?.gift?.name) || "Quà tặng";
  const count = Number(raw?.repeatCount ?? raw?.repeat ?? raw?.count ?? 1) || 1;
  const icon = (raw.giftIconUrl ?? "").toString().trim();
  return { name, count, icon };
}

function getUserMeta(event: LiveEvent) {
  const raw: any = event.raw;
  // backend: raw.data.user.{ uniqueId, nickname, profilePictureUrl, userId }
  const backendUser = raw?.data?.user;
  const nickname = (
    backendUser?.nickname ??
    backendUser?.displayName ??
    raw?.nickname ??
    raw?.displayName ??
    raw?.user?.nickname ??
    raw?.user?.displayName ??
    ""
  )
    .toString()
    .trim();
  const uniqueId = (
    backendUser?.uniqueId ??
    raw?.uniqueId ??
    raw?.unique_id ??
    raw?.username ??
    raw?.user?.uniqueId ??
    event.user ??
    ""
  )
    .toString()
    .trim();
  const avatar = (
    backendUser?.profilePictureUrl ??
    raw?.user?.profilePictureUrl ??
    raw?.profilePictureUrl ??
    raw?.avatarThumb?.urlList?.[0] ??
    ""
  )
    .toString()
    .trim();
  const userId = (backendUser?.userId ?? raw?.user?.userId ?? "")
    .toString()
    .trim();
  const displayNickname = nickname || uniqueId || "Ẩn danh";
  const displayUniqueId = uniqueId || nickname || "";
  return {
    nickname: displayNickname,
    uniqueId: displayUniqueId,
    avatar,
    userId,
    rawUser: backendUser ?? raw?.user ?? null,
  };
}

function InteractionItem({ event }: { event: LiveEvent }) {
  const meta = typeMeta[event.type as PanelType] ?? {
    label: event.type,
    icon: Sparkles,
    color: "coral" as const,
  };
  const Icon = meta.icon as React.ComponentType<{ size?: number }>;
  const { nickname, uniqueId, avatar } = getUserMeta(event);
  const giftMeta = event.type === "gift" ? getGiftMeta(event.raw) : null;
  return (
    <article className={`interaction-item interaction-${meta.color}`}>
      <div className="interaction-icon">
        <Icon size={17} />
      </div>
      {avatar ? (
        <img
          src={avatar}
          alt={nickname}
          className="h-8 w-8 shrink-0 rounded-full object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <strong
            className="truncate text-sm"
            title={uniqueId ? `@${uniqueId}` : nickname}
          >
            {nickname}
          </strong>
          <time className="shrink-0 text-[11px] text-muted-foreground">
            {event.time}
          </time>
        </div>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {uniqueId ? `@${uniqueId}` : "@Ẩn danh"}
        </p>
        {event.type === "chat" && (
          <p className="mt-2 text-sm leading-5 text-foreground">
            {event.summary}
          </p>
        )}
        {event.type === "member" && (
          <p className="mt-2 text-sm text-teal-700 dark:text-teal-300">
            Đã tham gia phòng LIVE ·{" "}
            <span className="font-medium text-foreground">{nickname}</span>{" "}
            {uniqueId ? `(@${uniqueId})` : ""}
          </p>
        )}
        {event.type === "gift" && giftMeta && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
            <span className="text-xs text-muted-foreground">đã tặng</span>
            {giftMeta.icon ? (
              <img
                src={giftMeta.icon}
                alt={giftMeta.name}
                className="h-8 w-8 object-contain"
                loading="lazy"
              />
            ) : null}
            <span className="font-semibold">{giftMeta.name}</span>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px]">
              x{giftMeta.count}
            </span>
            <span className="text-xs text-muted-foreground">bởi</span>
            <span className="font-medium text-foreground">{nickname}</span>
            {uniqueId ? (
              <span className="text-xs text-muted-foreground">@{uniqueId}</span>
            ) : null}
          </div>
        )}
        {/* fallback for other mapped types showing summary */}
        {event.type !== "chat" &&
          event.type !== "member" &&
          event.type !== "gift" && (
            <p className="mt-2 text-sm text-foreground">{event.summary}</p>
          )}
        <details className="mt-2 text-[11px] text-muted-foreground">
          <summary className="flex cursor-pointer list-none items-center gap-1 hover:text-foreground">
            <ChevronRight size={12} /> object chi tiết
          </summary>
          <pre className="json-object mt-2 overflow-x-auto rounded-lg p-3">
            {JSON.stringify(event.raw, null, 2)}
          </pre>
        </details>
      </div>
    </article>
  );
}

function InteractionPanel({
  type,
  events,
}: {
  type: PanelType;
  events: LiveEvent[];
}) {
  const meta = typeMeta[type];
  const Icon = meta.icon;
  const items = events.filter((e) => e.type === type);

  const listRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto scroll to bottom when new items arrive, if enabled
  // Instant scroll keeps up with rapid live events; smooth only for manual jump
  useEffect(() => {
    if (!autoScroll) return;
    const el = listRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [items.length, autoScroll]);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 80;
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    // Only update when state actually changes to avoid churn
    setAutoScroll((prev) => (prev === isNearBottom ? prev : isNearBottom));
  };

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    setAutoScroll(true);
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const isAtBottom = autoScroll;

  return (
    <section className={`panel panel-${meta.color}`}>
      <div className="panel-heading">
        <div className="flex items-center gap-3">
          <div className="panel-icon">
            <Icon size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold">{meta.label}</h2>
            <p className="text-xs text-muted-foreground">
              {items.length} sự kiện gần nhất
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground select-none"
            title={
              autoScroll ? "Tự động cuộn đang bật" : "Tự động cuộn đang tắt"
            }
          >
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => {
                const checked = e.target.checked;
                setAutoScroll(checked);
                if (checked) {
                  // Jump to bottom immediately when re-enabled
                  requestAnimationFrame(() => {
                    const el = listRef.current;
                    if (el)
                      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
                  });
                }
              }}
              className="size-3.5 accent-[#ff6b4a]"
            />
            Auto
          </label>
          <span className="count-badge">{items.length}</span>
        </div>
      </div>
      <div className="panel-list-wrap">
        <div ref={listRef} onScroll={handleScroll} className="panel-list">
          {items.length === 0 ? (
            <div className="empty-state">
              <Icon size={25} />
              <span>Chưa có dữ liệu</span>
              <small>Sự kiện mới sẽ xuất hiện ở đây</small>
            </div>
          ) : (
            items.map((event) => (
              <InteractionItem key={event.id} event={event} />
            ))
          )}
        </div>
        {!isAtBottom && items.length > 0 ? (
          <button
            type="button"
            onClick={scrollToBottom}
            className="auto-scroll-jump"
            aria-label="Cuộn xuống dưới"
          >
            <ArrowDown size={14} />
            Mới nhất
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default function OperatorPage() {
  const {
    username,
    setUsername,
    url,
    setUrl,
    status,
    connected,
    connecting,
    tiktokConnected,
    logs,
    handleConnect,
    handleDisconnect,
    events,
    stats,
  } = useOperator();

  const live = tiktokConnected;
  const busy = connecting || connected || live;
  const isLive = live || status === "connected";

  const comments = stats.chatCount;
  const joins = stats.memberCount;
  const gifts = stats.giftCount;

  const handleAction = () => {
    if (busy) handleDisconnect();
    else handleConnect();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !busy) handleConnect();
  };

  return (
    <main className="operator-shell">
      <header className="topbar">
        <div className="brand-mark">
          <Radio size={20} strokeWidth={2.5} />
        </div>
        <div>
          <p className="eyebrow">LIVE CONTROL ROOM</p>
          <h1 className="brand-title">
            TikTok <span>Pulse</span>
          </h1>
        </div>
        <div className="topbar-actions">
          <button className="icon-button" title="Cài đặt" type="button">
            <Settings2 size={18} />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="operator-content">
        <section className="hero-row">
          <div>
            <p className="eyebrow coral-text">DASHBOARD / OPERATOR</p>
            <h2 className="hero-title">
              Theo dõi
              <br />
              <em>phòng LIVE.</em>
            </h2>
            <p className="hero-copy">
              Mọi tương tác được chuẩn hóa thành object và cập nhật theo thời
              gian thực.
            </p>
          </div>
          <div className={`live-state ${isLive ? "is-live" : ""}`}>
            <span className="live-dot" />
            {live
              ? "LIVE đang hoạt động"
              : connected
                ? "Socket đang hoạt động — TikTok offline"
                : status === "connecting"
                  ? "Đang kết nối..."
                  : "Socket đang chờ kết nối"}
          </div>
        </section>

        <section className="control-strip">
          <div className="control-label">
            <span className="control-icon">
              <AtSign size={17} />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Kết nối creator
              </span>
              <p className="text-sm font-medium">
                Nhập username TikTok để bắt đầu
              </p>
            </div>
          </div>
          <div className="connect-form">
            <input
              aria-label="TikTok Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="@username"
              disabled={busy}
            />
            <input
              aria-label="Socket URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Socket URL"
              disabled={busy}
              className="!hidden md:!flex"
              title={url}
            />
            <Button
              onClick={handleAction}
              disabled={connecting}
              className={busy ? "disconnect-button" : "connect-button"}
            >
              {busy ? (
                <>
                  <WifiOff size={16} /> Ngắt kết nối
                </>
              ) : (
                <>
                  <Wifi size={16} /> Kết nối LIVE
                </>
              )}
            </Button>
          </div>
        </section>

        {/* Socket URL row on mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <input
            aria-label="Socket URL mobile"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="http(s)://your-socketio-server"
            disabled={busy}
            className="h-9 w-full rounded-full border bg-white px-4 text-sm outline-none focus:border-[#ff6b4a]/40 focus:ring-2 focus:ring-[#ff6b4a]/15 dark:bg-card"
          />
        </div>

        <section className="stats-grid">
          <div className="stat-card stat-coral">
            <MessageCircle size={18} />
            <div>
              <span>Bình luận</span>
              <strong>{comments}</strong>
            </div>
          </div>
          <div className="stat-card stat-teal">
            <Users size={18} />
            <div>
              <span>Người vào phòng</span>
              <strong>{joins}</strong>
            </div>
          </div>
          <div className="stat-card stat-gold">
            <Gift size={18} />
            <div>
              <span>Quà tặng</span>
              <strong>{gifts}</strong>
            </div>
          </div>
          <div className="stat-card stat-lilac">
            <Sparkles size={18} />
            <div>
              <span>Tổng tương tác</span>
              <strong>{events.length}</strong>
            </div>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <p className="eyebrow">REAL-TIME FEED</p>
            <h2 className="section-title">Dòng tương tác</h2>
          </div>
          <span className="feed-note">
            <span className="mini-pulse" /> Live updates · {events.length}{" "}
            events
            {stats.roomId ? ` · room ${stats.roomId}` : ""}
          </span>
        </div>

        <section className="interaction-grid">
          <InteractionPanel type="chat" events={events} />
          <InteractionPanel type="member" events={events} />
          <InteractionPanel type="gift" events={events} />
        </section>

        <section className="console-drawer">
          <div>
            <CircleHelp size={16} />
            <span>System activity</span>
            <span className="console-count">{logs.length}</span>
          </div>
          <div className="console-line">
            {logs.at(-1)?.message ??
              "Hệ thống sẵn sàng. Chờ kết nối creator..."}
          </div>
        </section>
      </div>
    </main>
  );
}
