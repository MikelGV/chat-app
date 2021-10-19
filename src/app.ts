// Third party imports
import express from "express";
import { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";

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
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM"
    }
}

const rooms: Record<string, {name: string}> = {};

function socket({io}:{io: Server}){
    logger.info("Sockets enabled");

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) => {
            console.log({roomName})

            const roomId = nanoid();

            rooms[roomId] = {
                name: roomName,
            };
            socket.join(roomId);

            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        })
    })
};

export default socket