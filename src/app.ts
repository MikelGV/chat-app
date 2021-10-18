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
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM"
    }
}

function socket({io}:{io: Server}){
    logger.info("Sockets enabled");

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) => {
            console.log({roomName})
        })
    })
};

export default socket