const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

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

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback ('Name and room name are required.');
    }

    if (users.getUserList(params.room).includes(params.name)) {
      return callback('That username is already in use, please choose a unique username');
    }

    socket.join(params.room.toLowerCase());
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room.toLowerCase());

    io.to(params.room.toLowerCase()).emit('updateUserList', users.getUserList(params.room.toLowerCase()));

    io.emit('updateRoomList', users.getAllRoomsList());

    // socket.leave(params.room)

    // io.emit -> io.to('The office fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The office fans').emit
    // socket.emit

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage("Admin", `${params.name} has joined.`));

    callback();
  });

  socket.on('displayRoomList', (callback) => {
    let allRooms = users.getAllRoomsList();

    io.emit('updateRoomList', allRooms);

    callback(!allRooms || allRooms.length <= 0);
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }


    callback();

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });


  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });


  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
      io.emit('updateRoomList', users.getAllRoomsList());
    }
  });
});

server.listen(port, () => {

  console.log(`Started on port ${port}`);
});
