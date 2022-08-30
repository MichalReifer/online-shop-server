const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    admin:{
        type: Boolean,
        required: true
    },
    address:{
        type: String,
        required: false
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User;