import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LiveBoard } from "@/components/operator/LiveBoard";
import { useOperator } from "@/hooks/useOperator";

export default function OperatorPage() {
  const {
    username,
    setUsername,
    url,
    setUrl,
    status,
    statusText,
    connected,
    connecting,
    tiktokConnected,
    logs,
    clearLogs,
    handleConnect,
    handleDisconnect,
    events,
    stats,
    clearEvents,
  } = useOperator();

  const live = tiktokConnected;
  const busy = connecting || connected || live;

  const dotColor =
    status === "connected"
      ? "bg-green-500"
      : status === "connecting"
        ? "animate-pulse bg-amber-500"
        : status === "error"
          ? "bg-red-500"
          : "bg-muted-foreground/40";

  const statusColor =
    status === "connected"
      ? "text-green-600 dark:text-green-400"
      : status === "connecting"
        ? "text-amber-600 dark:text-amber-400"
        : status === "error"
          ? "text-red-600 dark:text-red-400"
          : "text-muted-foreground";

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 px-4 py-5 lg:flex-row lg:px-8">
      <div className="fixed bottom-4 right-4 rounded-full border bg-background p-2 shadow-md">
        <ThemeToggle />
      </div>

      <div className="flex w-full flex-col rounded-lg border bg-card p-6 lg:max-w-md lg:shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">TikTok Web Operator</h1>

            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                live
                  ? "bg-green-500/15 text-green-600 dark:text-green-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {live ? "LIVE" : "OFFLINE"}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm">TikTok Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !busy) handleConnect();
              }}
              placeholder="Username"
              disabled={busy}
              className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Socket URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http(s)://your-socketio-server"
              disabled={busy}
              className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={busy ? handleDisconnect : handleConnect}
              disabled={connecting}
              className="rounded-md bg-primary px-4 py-2 text-white dark:bg-white dark:text-black"
            >
              {connecting ? "Connecting..." : busy ? "Disconnect" : "Connect"}
            </Button>

            <span
              className={`inline-flex items-center gap-1.5 text-xs ${statusColor}`}
            >
              <span className={`size-2 rounded-full ${dotColor}`} />
              {statusText}
            </span>

            {!live && connected && (
              <span className="text-xs text-muted-foreground">
                Socket online, TikTok offline
              </span>
            )}
          </div>

          <div className="overflow-hidden rounded-lg border">
            <div className="flex items-center justify-between p-3">
              <span>Console Log</span>

              <Button variant="ghost" size="sm" onClick={clearLogs}>
                Clear
              </Button>
            </div>

            <div className="h-64 overflow-y-auto bg-black p-4 font-mono text-sm text-white lg:h-80">
              {logs.length === 0 ? (
                <span className="text-white/60">No logs yet...</span>
              ) : (
                logs.map((log) => (
                  <div key={log.id}>
                    <span>[{log.time}]</span>{" "}
                    <span
                      className={
                        log.type === "success"
                          ? "text-green-400"
                          : log.type === "error"
                            ? "text-red-400"
                            : "text-blue-400"
                      }
                    >
                      [{log.type.toUpperCase()}]
                    </span>{" "}
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <LiveBoard
        events={events}
        stats={stats}
        socketConnected={connected}
        onClear={clearEvents}
      />
    </div>
  );
}
