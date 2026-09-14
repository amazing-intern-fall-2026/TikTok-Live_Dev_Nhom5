import {
    TikTokLiveConnection,
    ControlEvent,
    WebcastEvent,
    ControlAction,
} from "tiktok-live-connector";
import { EventEmitter } from "events";

let globalConnectionCount = 0;

type TikTokConnectionOptions = ConstructorParameters<
    typeof TikTokLiveConnection
>[1];
type TikTokConnectionState = Awaited<
    ReturnType<TikTokLiveConnection["connect"]>
>;

interface DisconnectedEventData {
    code?: number;
    reason?: string;
}

interface StreamEndEventData {
    action?: ControlAction;
}

interface TikTokErrorEvent {
    info?: string;
    exception?: unknown;
}

interface SubError {
    message?: string;
    toString(): string;
}

interface ConnectError extends Error {
    errors?: SubError[];
}

class TikTokConnectionWrapper extends EventEmitter {
    private uniqueId: string;
    private enableLog: boolean;

    // Connection state
    private clientDisconnected: boolean;
    private reconnectEnabled: boolean;
    private reconnectCount: number;
    private reconnectWaitMs: number;
    private maxReconnectAttempts: number;

    public connection: TikTokLiveConnection;

    constructor(
        uniqueId: string,
        options: TikTokConnectionOptions,
        enableLog: boolean,
    ) {
        super();

        this.uniqueId = uniqueId;
        this.enableLog = enableLog;

        // Connection State
        this.clientDisconnected = false;
        this.reconnectEnabled = true;
        this.reconnectCount = 0;
        this.reconnectWaitMs = 1000;
        this.maxReconnectAttempts = 5;

        this.connection = new TikTokLiveConnection(uniqueId, options);

        this.connection.on(
            WebcastEvent.STREAM_END,
            (_data: StreamEndEventData) => {
                this.log(`streamEnd event received, giving up connection`);
                this.reconnectEnabled = false;
            },
        );

        this.connection.on(
            ControlEvent.DISCONNECTED,
            ({ code, reason }: DisconnectedEventData) => {
                globalConnectionCount -= 1;
                this.log(
                    `TikTok connection disconnected (code: ${code}, reason: ${reason})`,
                );
                this.scheduleReconnect();
            },
        );

        this.connection.on(ControlEvent.ERROR, (err: TikTokErrorEvent) => {
            this.log(`Error event triggered: ${err.info}, ${err.exception}`);
            console.error(err);
        });
    }

    connect(isReconnect?: boolean): void {
        this.connection
            .connect()
            .then((state: TikTokConnectionState) => {
                this.log(
                    `${isReconnect ? "Reconnected" : "Connected"} to roomId ${state.roomId}`,
                );

                globalConnectionCount += 1;

                // Reset reconnect vars
                this.reconnectCount = 0;
                this.reconnectWaitMs = 1000;

                // Client disconnected while establishing connection => drop connection
                if (this.clientDisconnected) {
                    this.connection.disconnect();
                    return;
                }

                // Notify client
                if (!isReconnect) {
                    this.emit("connected", state);
                }
            })
            .catch((err: ConnectError) => {
                this.log(
                    `${isReconnect ? "Reconnect" : "Connection"} failed, ${err}`,
                );

                let errorMessage = err.message || err.toString();

                // Extract detailed sub-errors if available
                if (Array.isArray(err.errors) && err.errors.length > 0) {
                    const details = err.errors
                        .map((e) => e.message || e.toString())
                        .filter(Boolean)
                        .join(" | ");
                    if (details) {
                        errorMessage += ": " + details;
                    }
                }

                if (isReconnect) {
                    // Schedule the next reconnect attempt
                    this.scheduleReconnect(errorMessage);
                } else {
                    this.emit("disconnected", errorMessage);
                }
            });
    }

    scheduleReconnect(reason?: string): void {
        if (!this.reconnectEnabled) {
            return;
        }

        if (this.reconnectCount >= this.maxReconnectAttempts) {
            this.log(`Give up connection, max reconnect attempts exceeded`);
            this.emit("disconnected", `Connection lost. ${reason}`);
            return;
        }

        this.log(`Try reconnect in ${this.reconnectWaitMs}ms`);

        setTimeout(() => {
            if (
                !this.reconnectEnabled ||
                this.reconnectCount >= this.maxReconnectAttempts
            ) {
                return;
            }

            this.reconnectCount += 1;
            this.reconnectWaitMs *= 2;
            this.connect(true);
        }, this.reconnectWaitMs);
    }

    disconnect(): void {
        this.log(`Client connection disconnected`);

        this.clientDisconnected = true;
        this.reconnectEnabled = false;

        if (this.connection.isConnected) {
            this.connection.disconnect();
        }
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
