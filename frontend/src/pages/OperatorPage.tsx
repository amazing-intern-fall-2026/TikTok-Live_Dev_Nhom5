import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSocket } from "@/hooks/useSocket";
import { useState, useEffect } from "react";

type LogType = "info" | "success" | "error";

interface ConsoleLog {
  id: number;
  type: LogType;
  message: string;
  time: string;
}

export default function OperatorPage() {
  const [username, setUsername] = useState("");
  const { socket, connected } = useSocket();
  const [logs, setLogs] = useState<ConsoleLog[]>([]);

  const addLog = (type: LogType, message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        message,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleConnect = () => {
    if (!username.trim()) {
      addLog("error", "Missing Username");
      return;
    }

    socket.connect();
    addLog("success", `Connected TikTok User: @${username}`);
  };

  const handleDisconnect = () => {
    socket.disconnect();
    addLog("info", `Disconnected: @${username}`);
  };

  useEffect(() => {
    const onComment = (data: any) => {
      console.log("COMMENT:", data);
      addLog(
        "info",
        `[COMMENT] ${data.username}: ${data}`
      );
    };
    socket.on("COMMENT", onComment);
    return () => {
      socket.off("COMMENT", onComment);
    };
  }, [socket]);

  useEffect(() => {
    const onJoin = (data: any) => {
      console.log("JOIN:", data);
      addLog(
        "info",
        `[JOIN] ${data.username}: ${data}`
      );
    };
    socket.on("JOIN", onJoin);
    return () => {
      socket.off("JOIN", onJoin);
    };
  }, [socket]);

  useEffect(() => {
    const onGift = (data: any) => {
      console.log("GIFT:", data);
      addLog(
        "info",
        `[GIFT] ${data.username}: ${data}`
      );
    };
    socket.on("GIFT", onGift);
    return () => {
      socket.off("GIFT", onGift);
    };
  }, [socket]);

  return (
    <div className="flex h-screen w-full gap-6 px-20 py-5">
      <div className="fixed bottom-4 right-4 rounded-full border bg-none p-2 shadow-md">
        <ThemeToggle />
      </div>

      <div className="flex flex-col rounded-lg p-6 w-100">
        <div className="space-y-6 w-full">
          <h1 className="text-2xl font-bold">TikTok Web Operator</h1>

          <div className="space-y-2">
            <label className="text-sm">TikTok Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              disabled={connected}
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>

          <Button
            onClick={connected ? handleDisconnect : handleConnect}
            className="rounded-md bg-primary px-4 py-2 text-white dark:bg-white dark:text-black"
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>

          <div className="w-100 rounded-lg border">
            <div className="p-3">Console Log</div>

            <div className="h-100 w-100 overflow-y-auto bg-black p-4 text-sm text-white">
              {logs.length === 0 ? (
                <span className="text-white">No logs yet...</span>
              ) : (
                logs.map((log) => (
                  <div key={log.id}>
                    <span className="text-white">[{log.time}]</span>{" "}
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
    </div>
  );
}
