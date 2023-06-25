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
const productRoutes= require('./routes/productRoutes')
const imageRoutes = require('./routes/imagesRoutes')

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/users',userRoutes)
app.use('products',productRoutes)
app.use('/images',imageRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`DB Connected : Server running on port${process.env.PORT}`)
})


})