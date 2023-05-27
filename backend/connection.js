require('dotenv').config();

const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}).then((data)=>console.log('Connected to Mongod'))
.catch(err=>console.log(err))

mongoose.connection.on('error',err=>{
    console.log(err)
})

