const mongoose = require('mongoose')

let portfoy = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    exchange:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    operationType:{
        type:Boolean,
        required:true
    },status:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

module.exports = mongoose.model('portfolios',portfoy)