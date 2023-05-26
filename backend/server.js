const express = require('express');
const app = express();
const http= require('http');
const cors = require('cors')
const server = http.createServer(app);
const {Server}=require('socket.io');
const io = new Server(server,{
    cors:'*',
    method:'*'
})

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

server.listen(4000,()=>{
    console.log('Server running on port, 4000')
})