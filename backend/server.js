const express = require('express');
const app = express();
const http= require('http');
const cors = require('cors')
const server = http.createServer(app);
const {Server}=require('socket.io');
require('dotenv').config();
const io = new Server(server,{
    cors:'*',
    method:'*'
})

const User= require('./models/User');
const { default: mongoose } = require('mongoose');
const userRoutes=require('./routes/userRoutes')
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/users',userRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(4000,()=>{
        console.log(`DB Connected : Server running on port${process.env.PORT}`)
})


})