const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task=require('./task');

const userSchema= new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
})

const User= mongoose.model('User',userSchema);

module.exports=User;