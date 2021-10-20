// Third party imports
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

// My imports
import logger from "./utils/logger"
import socket from "./app";
const app = express();

const httpServer = createServer(app)

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin")

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    },
});

httpServer.listen(port, host, () => {
    logger.info("Server is listening");
    logger.info(`http::/${host}:${port}`);

    socket({io});
});
