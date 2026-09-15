import { useSocket } from "./useSocket";
import { useConsoleLogs } from "./useConsoleLogs";
import { useTikTok } from "./useTikTok";

export function useOperator() {
  const { socket, connected } = useSocket();
  const { logs, addLog, clearLogs } = useConsoleLogs();
  const { username, setUsername, handleConnect, handleDisconnect, interactions } = useTikTok({
    socket,
    addLog,
  });

  return {
    socket,
    connected,
    logs,
    addLog,
    clearLogs,
    username,
    setUsername,
    handleConnect,
    handleDisconnect,
    interactions,
  };
}
