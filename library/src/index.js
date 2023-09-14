const express = require('express');
const config = require('./config');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const indexRoute = require('./routes/index');
const error404 = require('./middleware/er404');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.json());

app.use(indexRoute);

app.use(error404);

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('commentary message', message => {
        message.date = Date.now();
        console.log(socket.handshake.query);
        console.log('message: ' + message.msg + ' time: ' + message.date);
        io.emit('commentary message', message);
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

const port = config.PORT || 8989
server.listen(port, ()=>{
    console.log(`server port: ${port}`)
})
