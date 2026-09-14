import express from "express";
import { Server as Engine } from "@socket.io/bun-engine";
import cors from "cors";
import morgan from "morgan";
import config from "./config/config";
import router from "./routes";
import { initializeSockets } from "./sockets";

const engine = new Engine({ path: "/socket.io/" });
const socketPort = 3001;

initializeSockets(engine);

const bunSocket = Bun.serve({
    port: socketPort,
    ...engine.handler(),
    idleTimeout: 30,
});

console.log(`Socket.IO listening on ${bunSocket.port}`);

const app = express();
const port = config().PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
