const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cakeSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        requires: false
    },
    image: {
        type: Buffer,
        required: false
    }
}, {timestamps: true})

const Cake = mongoose.model('Cake', cakeSchema)

module.exports = Cake;