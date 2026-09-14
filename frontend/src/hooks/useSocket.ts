import { socket } from "@/services/socket";
import { useState, useEffect } from "react";
export const useSocket = () => {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      console.log("Socket connected:", socket.id);
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log("Socket disconnected");
      setConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return {
    socket,
    connected,
  };
};
