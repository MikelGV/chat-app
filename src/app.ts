import express from "express";
import http from "http";
import bodyparser from "body-parser";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app)
const PORT = '3000';
const io = new Server(server);


app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log('Listenint on *:3000');
});