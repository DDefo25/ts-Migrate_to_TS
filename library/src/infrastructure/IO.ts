// import mongoose from 'mongoose';
import { Socket } from 'socket.io';
import { Server as ServerIO } from 'socket.io';
import { Server } from 'node:http';
import registerCommentaryHandlers from "../handlers/commentaryHandler";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../db/interfaces/socketIO.interfaces';

export function getIOServer(server: Server): ServerIO {
    const io = new ServerIO<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);


    io.on('connection', (socket: Socket) => {
        console.log('a user connected ' + socket.id);
        const {bookId} = socket.handshake.query;
        if (bookId) socket.join(bookId)
        registerCommentaryHandlers(socket);
    });

    return io;
}