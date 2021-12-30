const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    cart :{
        type: Object,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,ref:'register'
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
})
module.exports = mongoose.model('order',Order)