import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";

type LogType = "info" | "success" | "error";

interface ConsoleLog {
  id: number;
  type: LogType;
  message: string;
  time: string;
}

export default function OperatorPage() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
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

    setConnected(true);
    addLog("success", `Connected TikTok User: @${username}`);
  };

  const handleDisconnect = () => {
    setConnected(false);
    addLog("info", `Disconnected: @${username}`);
  };

  return (
    <div className="flex h-screen w-full gap-6 px-20 py-5">
      <div className="fixed bottom-4 right-4 rounded-full border bg-none p-2 shadow-md">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center w-135 h-240 bg-black">
        <span className="text-sm text-white">Live Screen</span>
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
