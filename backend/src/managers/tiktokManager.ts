import { TikTokLiveConnection, ControlEvent, WebcastEvent } from "tiktok-live-connector";
import { Server } from "socket.io"

class TiktokManager {
  private connections = new Map<string, TikTokLiveConnection>();
  private io: Server | null = null;

  setSocketIO(io: Server) {
    this.io = io;
  }

  async connect(username: string) {
    if (this.connections.has(username)) {
      return this.connections.get(username)!;
    }



    // Note: The connection is only connected successfully if VPN is on
    // this problem is mentioned at issue #329 at this commment: https://github.com/zerodytrash/TikTok-Live-Connector/issues/329#issuecomment-5621760481
    const connection = new TikTokLiveConnection(username, {});


    connection.on(ControlEvent.ERROR, (err: any) => {
      console.error(`[TikTok Live Error] (@${username}):`, JSON.stringify(err, null, 2));
    });

    connection.on(ControlEvent.DISCONNECTED, () => {
      console.log(`[TikTok Live Disconnected] (@${username})`);
      this.connections.delete(username);
    });


    try {
      await connection.connect();
      this.connections.set(username, connection);
      return connection;
    } catch (err) {
      this.connections.delete(username);
      throw err;
    }
  }

  get(username: string) {
    return this.connections.get(username);
  }

  async disconnect(username: string) {
    const connection = this.get(username);
    if (!connection) {
      throw new Error("Not connected");
    }
    await connection.disconnect();
    this.connections.delete(username);
  }
}

export const tiktokManager = new TiktokManager();
