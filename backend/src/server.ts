import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import morgan from "morgan";
import config from "./config/config";
import router from "./routes";
import tikTokRouter from "./routes/tiktokRouter.ts"
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const port = config().PORT;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.use("/api/tiktok", tikTokRouter);

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);
});

process.on("uncaughtException", (err: any) => {
  console.error("[Uncaught Exception]", err?.message || err);
});

process.on("unhandledRejection", (reason: any) => {
  console.error("[Unhandled Rejection]", reason?.message || reason);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
