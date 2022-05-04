const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    title: {
        type: String,
        required: false
    }, 
    price: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        requires: false
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User;