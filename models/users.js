const mongoose = require('mongoose')

const users = mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        required:true,
        type:String
    },
    active:{
        type:Boolean,
        required:true,
        default: false
    },
    
},{timestamps:true})
module.exports = mongoose.model('users',users)