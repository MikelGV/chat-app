// Third party imports
import express from "express";
import { Server, Socket } from "socket.io";

// My imports
import logger from "./utils/logger";

const app = express();

// routes
app.get('/', (_, res) => res.send("Server is up"))

// socket.io
const EVENTS = {
    connection: 'connection'
}

function socket({io}:{io: Server}){
    logger.info("Sockets enabled");

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);
    })
};

export default socket