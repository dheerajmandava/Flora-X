const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
})  

module.exports = mongoose.model('plant',plantSchema)