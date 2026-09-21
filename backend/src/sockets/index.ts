import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { TikTokConnectionWrapper } from "../services/tiktok";
import { WebcastEvent } from "tiktok-live-connector";
import { formatUser, createSocketPayload } from "../utils/dataFormater.ts"
import config from "../config/config";

let io: Server | undefined;

export function initializeSockets(bunEngine: Engine) {
  io = new Server({
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.bind(bunEngine);
  io.on("connection", (socket) => {
    let tikTokConnectionWrapper: TikTokConnectionWrapper | undefined;
    console.log(`[Socket] Client connected ${socket.id}`);

    socket.on("error", (err) => {
      console.error(`[Socket] Error on ${socket.id}:`, err);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id} (${reason})`);
      if (tikTokConnectionWrapper) {
        tikTokConnectionWrapper.disconnect();
        tikTokConnectionWrapper = undefined;
      }
    });

    socket.on("setUniqueID", async (uniqueID) => {
      console.log(`[Socket] ${socket.id} got ${uniqueID}`);

      if (tikTokConnectionWrapper) {
        tikTokConnectionWrapper.disconnect();
        tikTokConnectionWrapper = undefined;
      }

      try {
        tikTokConnectionWrapper = new TikTokConnectionWrapper(
          uniqueID,
          {
            signApiKey: config().EULER_API_KEY,
          },
          true,
        );
        tikTokConnectionWrapper.connect();
      } catch (err: any) {
        socket.emit("tiktokDisconnected", err.toString());
        return;
      }

      tikTokConnectionWrapper.once("connected", (state) =>
        socket.emit("tiktokConnected", state),
      );
      tikTokConnectionWrapper.once("disconnected", (reason) =>
        socket.emit("tiktokDisconnected", reason),
      );

      // chat events
      tikTokConnectionWrapper.connection.on(WebcastEvent.CHAT, (msg) => {
        console.log("CHAT: ", msg.content);
        socket.emit("chat", createSocketPayload("chat", msg.common?.roomId || "", {
          data: { user: formatUser(msg.user, msg.userIdentity) },
          comment: msg.content,
          commentId: msg.common?.msgId,
        }));
      });

      // gift events
      tikTokConnectionWrapper.connection.on(WebcastEvent.GIFT, gift => {
        console.log("GIFT: ", gift.gift?.icon?.urlList?.[0]);
        socket.emit("gift", createSocketPayload("gift", gift.common?.roomId || "", {
          data: { user: formatUser(gift.user, gift.userIdentity) },
          giftId: gift.giftId,
          giftName: gift.gift?.name,
          giftIconUrl: gift.gift?.icon?.urlList?.[0],
          cointCount: gift.gift?.diamondCount,
          repeatCount: gift.repeatCount,
          totalCoins: gift.repeatCount * Number(gift.gift?.diamondCount),
          repeatEnd: Boolean(gift.repeatEnd),
        }))
      });

      tikTokConnectionWrapper.connection.on(WebcastEvent.LIKE, (likes) => {
        console.log("LIKE: ", Number(likes.total));
        socket.emit("like", createSocketPayload("like", likes.common?.roomId || "", {
          data: { user: formatUser(likes.user) },
          totalLike: Number(likes.total),
        }))
      });

      tikTokConnectionWrapper.connection.on(WebcastEvent.MEMBER, (member) => {
        console.log("JOIN: ", member.user?.nickname);
        socket.emit("join", createSocketPayload("join", member.common?.roomId || "", {
          data: { user: formatUser(member.user) },
        }))
      });

      tikTokConnectionWrapper.connection.on(WebcastEvent.FOLLOW, (follow) => {

        console.log("FOLLOW: ", follow.user?.nickname);
        socket.emit("follow", createSocketPayload("follow", follow.common?.roomId || "", {
          data: { user: formatUser(follow.user) },
        }))
      });

      tikTokConnectionWrapper.connection.on(WebcastEvent.SHARE, (share) => {
        console.log("SHARE: ", share.user?.nickname);
        socket.emit("share", createSocketPayload("share", share.common?.roomId || "", {
          data: { user: formatUser(share.user) },
          shareType: share.shareType || "copy_link"
        }))
      });

      tikTokConnectionWrapper.connect()

    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  return io;
}
