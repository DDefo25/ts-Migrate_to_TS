const express = require('express');
const config = require('./config');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const registerCommentaryHandlers = require("./handlers/commentaryHandler");

const indexRoute = require('./routes/index');
const error404 = require('./middleware/er404');

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = config.PORT || 8989;
const MONGO_URL = config.MONGO_URL || "mongodb://root:pass@mongo:27017";

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.json());

io.on('connection', (socket) => {
    console.log('a user connected');
    const {bookId} = socket.handshake.query;
    socket.join(bookId)
    registerCommentaryHandlers(socket);
} );

app.use(indexRoute);

app.use(error404);

(async function (PORT, MONGO_URL) {
    try {
        await mongoose.connect(MONGO_URL, {dbName: 'library'});
        server.listen(PORT);
        console.log('server is listening: ' + PORT);
    } catch (e) {
        console.log(e)
    }
})(PORT, MONGO_URL)