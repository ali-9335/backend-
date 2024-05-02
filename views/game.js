// const express=require('express');
// const socketIO=require('socket.io');
// const path=require('path');
// const app=express();

// const server=app.listen(3001,()=>{
// console.log("Server Started");
// })
// const io=socketIO(server);
// app.use(express.static(path.join(__dirname)))
// io.on('connection',(socket)=>{
// console.log("A user has connected to server");
// socket.on('name',msg=>{
// io.emit('name',msg);
// })
// socket.on('chat message',msg=>{
// io.emit('chat message',msg);
// })
// })