import { EventEmitter } from "events";
import WebSocket from "ws";
import {
    createWebSocketUrl,
    SchemaVersion,
} from "@eulerstream/euler-websocket-sdk";
import {
    WebcastChatMessage,
    WebcastGiftMessage,
    WebcastMemberMessage,
    WebcastPushFrame,
} from "tiktok-live-proto/v2";
import type { LiveInteraction, LiveUser } from "../types/live-interaction";

let globalConnectionCount = 0;

type TikTokConnectionOptions = Record<string, unknown>;
type TikTokChatMessage = ReturnType<typeof WebcastChatMessage.decode>;

function toDisplayText(value: unknown, fallback: string): string {
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    if (value && typeof value === "object") {
        const item = value as Record<string, unknown>;
        const preferred = item.defaultFormat ?? item.defaultPattern ?? item.displayType;
        if (typeof preferred === "string" || typeof preferred === "number") {
            return String(preferred);
        }
    }

    return fallback;
}

function getUser(value: any): LiveUser {
    const user = value?.user ?? value?.fromUser ?? {};
    return {
        id: user.id?.toString(),
        uniqueId: toDisplayText(user.uniqueId ?? user.unique_id, "unknown"),
        nickname: toDisplayText(
            user.nickname ?? user.displayName ?? user.uniqueId,
            "Unknown viewer",
        ),
        avatarUrl: user.avatarThumb?.urlList?.[0] ?? user.avatarLarger?.urlList?.[0],
    };
}

function createInteraction(type: LiveInteraction["type"], value: any, detail: any): LiveInteraction {
    return {
        id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        createdAt: new Date().toISOString(),
        user: getUser(value),
        [type === "comment" ? "comment" : type === "join" ? "join" : "gift"]: detail,
        raw: value,
    } as LiveInteraction;
}

class TikTokConnectionWrapper extends EventEmitter {
    private uniqueId: string;
    private enableLog: boolean;
    private socket?: WebSocket;
    private clientDisconnected = false;

    constructor(
        uniqueId: string,
        _options: TikTokConnectionOptions,
        enableLog: boolean,
    ) {
        super();

        this.uniqueId = uniqueId;
        this.enableLog = enableLog;
    }

    connect(isReconnect?: boolean): void {
        const apiKey = process.env.EULER_API_KEY;
        if (!apiKey) {
            this.emit("disconnected", "Missing EULER_API_KEY in backend/.env");
            return;
        }

        const url = createWebSocketUrl({
            uniqueId: this.uniqueId,
            apiKey,
            features: {
                normalizeUniqueId: true,
                bundleEvents: false,
                schemaVersion: SchemaVersion.v2,
            },
        });
        this.socket = new WebSocket(url);

        this.socket.on("open", () => {
            globalConnectionCount += 1;
            this.log(`${isReconnect ? "Reconnected" : "Connected"} via Euler`);
            this.emit("connected", { uniqueId: this.uniqueId });
        });

        this.socket.on("message", (data) => this.handleMessage(data));
        this.socket.on("error", (error) => this.log(`Euler error: ${error}`));
        this.socket.on("close", (code, reason) => {
            if (globalConnectionCount > 0) globalConnectionCount -= 1;
            if (!this.clientDisconnected) {
                this.emit(
                    "disconnected",
                    `Euler WebSocket closed (${code}): ${reason.toString() || "no reason"}`,
                );
            }
        });
    }

    private handleMessage(data: WebSocket.RawData): void {
        try {
            const bytes = data instanceof Buffer ? data : Buffer.from(data as ArrayBuffer);
            const text = bytes.toString("utf8").trim();

            if (text.startsWith("{") || text.startsWith("[")) {
                this.handleDecodedEvent(JSON.parse(text));
                return;
            }

            const frame = WebcastPushFrame.decode(bytes);
            if (frame.payloadType === "WebcastChatMessage") {
                const chat: TikTokChatMessage = WebcastChatMessage.decode(frame.payload);
                this.emitChat(chat);
            } else if (frame.payloadType === "WebcastGiftMessage") {
                const gift = WebcastGiftMessage.decode(frame.payload) as any;
                this.emit("interaction", createInteraction("gift", gift, {
                    id: gift.giftId?.toString(),
                    name: toDisplayText(gift.giftName ?? gift.gift?.name, "Gift"),
                    repeatCount: Number(gift.repeatCount ?? 1),
                    diamondCount: Number(gift.diamondCount ?? gift.gift?.diamondCount ?? 0) || undefined,
                }));
            } else if (frame.payloadType === "WebcastMemberMessage") {
                const member = WebcastMemberMessage.decode(frame.payload) as any;
                this.emit("interaction", createInteraction("join", member, { action: "joined" }));
            }
        } catch (error) {
            this.log(`Unable to decode Euler message: ${error}`);
        }
    }

    private handleDecodedEvent(event: unknown): void {
        const value = event as Record<string, any>;
        const type = String(value.type ?? value.event ?? "").toLowerCase();
        const data = value.data ?? value;

        if (type.includes("chat") || data.comment || data.content) {
            const chat = {
                uniqueId: data.user?.uniqueId ?? data.uniqueId,
                username: data.user?.nickname ?? data.username,
                comment: data.comment ?? data.content,
                raw: data,
            };
            this.emit("chat", chat);
            this.emit("interaction", createInteraction("comment", chat, { text: chat.comment ?? "" }));
        } else if (type.includes("gift")) {
            this.emit("interaction", createInteraction("gift", data, {
                id: data.giftId?.toString(),
                name: toDisplayText(data.giftName ?? data.gift?.name, "Gift"),
                repeatCount: Number(data.repeatCount ?? 1),
                diamondCount: Number(data.diamondCount ?? 0) || undefined,
            }));
        } else if (type.includes("member") || type.includes("join") || type.includes("enter")) {
            this.emit("interaction", createInteraction("join", data, { action: "joined" }));
        }
    }

    private emitChat(chat: TikTokChatMessage): void {
        this.emit("chat", {
            uniqueId: chat.user?.uniqueId,
            username: chat.user?.nickname,
            comment: chat.comment,
            raw: chat,
        });
        this.emit("interaction", createInteraction("comment", chat, { text: chat.comment ?? "" }));
    }

    disconnect(): void {
        this.log(`Client connection disconnected`);

        this.clientDisconnected = true;
        this.socket?.close();
    }

    private log(logString: string): void {
        if (this.enableLog) {
            console.log(`WRAPPER @${this.uniqueId}: ${logString}`);
        }
    }
}

export { TikTokConnectionWrapper };

export function getGlobalConnectionCount(): number {
    return globalConnectionCount;
}
