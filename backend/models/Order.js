const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
  products: {
    type: Object,
  },
  Owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  status:{
    type:String,
    default:'processings'
  },
  total:{
    type:Number,
    default:0
  },
  count:{
    type:Number,
    default:0
  },
  date:{
    type:String,
    default:new Date().toISOString().split('T')[0]
  },
  adress:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true

  }
},{minimize:false});

const Order= mongoose.model("Order",OrderSchema);

module.exports = Order;
