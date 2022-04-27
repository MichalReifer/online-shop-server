const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cakeSchema = new Schema({
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

const Cake = mongoose.model('Cake', cakeSchema)

module.exports = Cake;