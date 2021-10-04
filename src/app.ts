// Third party imports
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

// My imports
import { db } from "./utils/db";
import {router as authRoutes} from "./routes/auth";
import {Error} from "./utils/error"
import { DB_PASS } from "./secret";
import {router as feedRoutes} from "./routes/feed";

const app = express();
const server = http.createServer(app)
const PORT = '3000';
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRoutes)


app.use((req, res, next) => {
    res.setHeader('Access-Control_Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control_Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((error: Error, req:Request, res:Response, next:NextFunction) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data:data})
})

mongoose.connect(DB_PASS).then(result => {
    server.listen(PORT);
    io.on('connection', socket => {
        console.log('connected.')
    })
}).catch(err => console.log(err));