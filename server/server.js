const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log("Wow!! A new User");

  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });

  socket.emit('newMessage', { from : "Ravinder", text : "Hey there", createdAt: 123});

  socket.on('createMessage', (message) =>{
    console.log(message);
  });
});


server.listen(port, () => console.log(`app listening on port ${port}!`))
