import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import morgan from "morgan";
import config from "./config/config";
import router from "./routes";
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

io.on("connection", (socket) => {
    console.log(`Connected ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;
