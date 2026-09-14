import { useState, useCallback } from "react";

export type LogType = "info" | "success" | "error";

export interface ConsoleLog {
  id: number;
  type: LogType;
  message: string;
  time: string;
}

export function useConsoleLogs() {
  const [logs, setLogs] = useState<ConsoleLog[]>([]);

  const addLog = useCallback((type: LogType, message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        type,
        message,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    addLog,
    clearLogs,
    setLogs,
  };
}
