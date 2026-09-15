import {
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
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useOperator } from "@/hooks/useOperator";
import type { LiveInteraction } from "@/hooks/useTikTok";

const typeMeta = {
  comment: { label: "Bình luận", icon: MessageCircle, color: "coral" },
  join: { label: "Người vào phòng", icon: Users, color: "teal" },
  gift: { label: "Quà tặng", icon: Gift, color: "gold" },
} as const;

function toRenderableText(value: unknown, fallback = "Không xác định") {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;
    const preferred = item.defaultFormat ?? item.defaultPattern ?? item.displayType;
    if (typeof preferred === "string" || typeof preferred === "number") return String(preferred);
  }
  return fallback;
}

function InteractionItem({ interaction }: { interaction: LiveInteraction }) {
  const meta = typeMeta[interaction.type];
  const Icon = meta.icon;
  const time = new Date(interaction.createdAt).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className={`interaction-item interaction-${meta.color}`}>
      <div className="interaction-icon"><Icon size={17} /></div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <strong className="truncate text-sm">{interaction.user.nickname}</strong>
          <time className="shrink-0 text-[11px] text-muted-foreground">{time}</time>
        </div>
        <p className="mt-1 truncate text-xs text-muted-foreground">@{interaction.user.uniqueId}</p>
        {interaction.type === "comment" && <p className="mt-2 text-sm leading-5 text-foreground">{interaction.comment?.text}</p>}
        {interaction.type === "join" && <p className="mt-2 text-sm text-teal-700 dark:text-teal-300">Đã tham gia phòng LIVE</p>}
        {interaction.type === "gift" && <div className="mt-2 flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300"><span className="font-semibold">{toRenderableText(interaction.gift?.name, "Quà tặng")}</span><span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px]">x{interaction.gift?.repeatCount ?? 1}</span></div>}
        <details className="mt-2 text-[11px] text-muted-foreground"><summary className="flex cursor-pointer list-none items-center gap-1 hover:text-foreground"><ChevronRight size={12} /> object chi tiết</summary><pre className="json-object mt-2 overflow-x-auto rounded-lg p-3">{JSON.stringify(interaction, null, 2)}</pre></details>
      </div>
    </article>
  );
}

function InteractionPanel({ type, interactions }: { type: LiveInteraction["type"]; interactions: LiveInteraction[] }) {
  const meta = typeMeta[type];
  const Icon = meta.icon;
  const items = interactions.filter((interaction) => interaction.type === type);

  return (
    <section className={`panel panel-${meta.color}`}>
      <div className="panel-heading"><div className="flex items-center gap-3"><div className="panel-icon"><Icon size={18} /></div><div><h2 className="text-sm font-bold">{meta.label}</h2><p className="text-xs text-muted-foreground">{items.length} sự kiện gần nhất</p></div></div><span className="count-badge">{items.length}</span></div>
      <div className="panel-list">{items.length === 0 ? <div className="empty-state"><Icon size={25} /><span>Chưa có dữ liệu</span><small>Sự kiện mới sẽ xuất hiện ở đây</small></div> : items.map((interaction) => <InteractionItem key={interaction.id} interaction={interaction} />)}</div>
    </section>
  );
}

export default function OperatorPage() {
  const { connected, logs, username, setUsername, handleConnect, handleDisconnect, interactions } = useOperator();
  const comments = interactions.filter((item) => item.type === "comment").length;
  const joins = interactions.filter((item) => item.type === "join").length;
  const gifts = interactions.filter((item) => item.type === "gift").length;

  return (
    <main className="operator-shell">
      <header className="topbar"><div className="brand-mark"><Radio size={20} strokeWidth={2.5} /></div><div><p className="eyebrow">LIVE CONTROL ROOM</p><h1 className="brand-title">TikTok <span>Pulse</span></h1></div><div className="topbar-actions"><button className="icon-button" title="Cài đặt"><Settings2 size={18} /></button><ThemeToggle /></div></header>
      <div className="operator-content">
        <section className="hero-row"><div><p className="eyebrow coral-text">DASHBOARD / OPERATOR</p><h2 className="hero-title">Theo dõi nhịp đập<br /><em>phòng LIVE.</em></h2><p className="hero-copy">Mọi tương tác được chuẩn hóa thành object và cập nhật theo thời gian thực.</p></div><div className={`live-state ${connected ? "is-live" : ""}`}><span className="live-dot" />{connected ? "Socket đang hoạt động" : "Socket đang chờ kết nối"}</div></section>
        <section className="control-strip"><div className="control-label"><span className="control-icon"><AtSign size={17} /></span><div><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kết nối creator</span><p className="text-sm font-medium">Nhập username TikTok để bắt đầu</p></div></div><div className="connect-form"><input aria-label="TikTok Username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="@username" disabled={connected} /><Button onClick={connected ? handleDisconnect : handleConnect} className={connected ? "disconnect-button" : "connect-button"}>{connected ? <><WifiOff size={16} /> Ngắt kết nối</> : <><Wifi size={16} /> Kết nối LIVE</>}</Button></div></section>
        <section className="stats-grid"><div className="stat-card stat-coral"><MessageCircle size={18} /><div><span>Bình luận</span><strong>{comments}</strong></div></div><div className="stat-card stat-teal"><Users size={18} /><div><span>Người vào phòng</span><strong>{joins}</strong></div></div><div className="stat-card stat-gold"><Gift size={18} /><div><span>Quà tặng</span><strong>{gifts}</strong></div></div><div className="stat-card stat-lilac"><Sparkles size={18} /><div><span>Tổng tương tác</span><strong>{interactions.length}</strong></div></div></section>
        <div className="section-heading"><div><p className="eyebrow">REAL-TIME FEED</p><h2 className="section-title">Dòng tương tác</h2></div><span className="feed-note"><span className="mini-pulse" /> Live updates</span></div>
        <section className="interaction-grid"><InteractionPanel type="comment" interactions={interactions} /><InteractionPanel type="join" interactions={interactions} /><InteractionPanel type="gift" interactions={interactions} /></section>
        <section className="console-drawer"><div><CircleHelp size={16} /><span>System activity</span><span className="console-count">{logs.length}</span></div><div className="console-line">{logs.at(-1)?.message ?? "Hệ thống sẵn sàng. Chờ kết nối creator..."}</div></section>
      </div>
    </main>
  );
}
