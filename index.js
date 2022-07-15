const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./messages');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
let usersOnline = 0;

io.on('connection', (socket) => {
    socket.on('user joined', (name) => {
        socket.username = name;

        usersOnline++
        socket.emit('chat message', formatMessage("System", `Welcome to the chat!! \n${usersOnline} users online`));  
        socket.broadcast.emit('chat message', formatMessage("System", `"${socket.username}" joined the chat`));
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', formatMessage(socket.username ? socket.username : "user", msg));
    });
    
    socket.on('disconnect', () => {
        usersOnline--
        io.emit('chat message', formatMessage("System", `"${socket.username}" left the chat.`));
    });
});

server.listen(3001, () => {
    console.log('Listening on port 3001');
});