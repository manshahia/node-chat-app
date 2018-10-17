const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log("Wow!! A new User");

  socket.emit('newMessage', generateMessage("Admin","Welcome to the chat app"));
  socket.broadcast.emit('newMessage', generateMessage("Admin","New user joined"));
  socket.on('createMessage', (message) =>{
    console.log(message);
    io.emit('newMessage', generateMessage(message.from,message.text));
  });

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
  });

  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });
});


server.listen(port, () => console.log(`app listening on port ${port}!`))
