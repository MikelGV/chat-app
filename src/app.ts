// Third party imports
import express from "express";
import http from "http";
import bodyparser from "body-parser";
import { Server } from "socket.io";

// My imports
import { db } from "./utils/db";


const app = express();
const server = http.createServer(app)
const PORT = '3000';
const io = new Server(server);


app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
});

db.then(result => {
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
    server.listen(PORT, () => {
        console.log('Listenint on *:3000');
    });
});