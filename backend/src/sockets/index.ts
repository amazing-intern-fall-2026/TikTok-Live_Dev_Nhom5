import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { TikTokConnectionWrapper } from "../services/tiktok";
import { WebcastEvent } from "tiktok-live-connector";

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

        socket.on("setUniqueID", async (uniqueID, options) => {
            console.log(`[Socket] ${socket.id} got ${uniqueID}`);

            if (tikTokConnectionWrapper) {
                tikTokConnectionWrapper.disconnect();
                tikTokConnectionWrapper = undefined;
            }

            try {
                tikTokConnectionWrapper = new TikTokConnectionWrapper(
                    uniqueID,
                    options,
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

            tikTokConnectionWrapper.connection.on(WebcastEvent.CHAT, (msg) => {
                console.log(msg.content);
                socket.emit("chat", msg);
            });
        });
    });
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }

    return io;
}
