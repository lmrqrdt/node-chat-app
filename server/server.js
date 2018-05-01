const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// This code compares two methods for getting to the public folder
// console.log(__dirname + '/../public');
// console.log(publicPath);

// instructor's solution for serving index.html
app.use(express.static(publicPath));

// my solution for serving index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(publicPath + '/index.html'));
// });

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));


  socket.broadcast.emit('newMessage', generateMessage("Admin", "A new user has joined chat"));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    //callback('This is from the server!');

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
