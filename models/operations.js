const mongoose = require('mongoose')

let hareket = mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    exchange:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    operationType:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('operations',hareket)