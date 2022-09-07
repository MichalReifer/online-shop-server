const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userName :{
    type: String,
    required: true
  },
  products: {
      type: Map,
      required: true
  },
  totalPrice: {
      type: Number,
      required: false
  }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;