// Third party imports
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import mongoose from "mongoose";

// My imports
import logger from "./utils/logger"
import { DB_PASS } from "./secret";
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

mongoose.connect(DB_PASS).then(resutl => {
    httpServer.listen(port, host, () => {
        logger.info("Server is listening");
        logger.info(`http::/${host}:${port}`);

        socket({io});
    });
});
