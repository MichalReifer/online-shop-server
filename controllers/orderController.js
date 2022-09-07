const Order = require('../models/order')
const mongoose = require('mongoose')


const getAllOrders = (req, res) => {
  const userName = new RegExp(req.query.name, 'i');
  Order.find({userName})
    .sort({createdAt:-1})
    .then(orders=>res.send(orders))
    .catch(err=>res.status(404).send({error: err.message}))
}

const getOrdersByUserId = (req, res) => {
  const userId = req.params.id
  if (!mongoose.isValidObjectId(userId)) 
    return res.status(400).send({error: 'user id is not valid'})

  Order.find({userId})
    .sort({createdAt:-1})
    .then(orders=>res.send(orders))
    .catch(err=>res.status(404).send({error: err.message}))
}

const addNewOrder = (req, res) => {
  const newOrder = req.body
  if (!mongoose.isValidObjectId(newOrder.userId)) 
    return res.status(400).send({error: 'user id is not valid'})

  Order.create(newOrder)
    .then(order=> res.send(order))
    .catch(err => res.status(400).json({error: err.message}))
}

const getOrderById = (req, res) => {
  const id = req.params.id
  if (!mongoose.isValidObjectId(id)) 
    return res.status(400).send({error: 'order id is not valid'})

  Order.findById(id)
    .then(order=>{
      if(!order) throw Error('no such order')
      else res.send(order)
    })
    .catch(err=>res.status(404).send({error: err.message}))
}

const deleteOrderById = (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(order=>{
      if(!order) throw Error('no such order')
      else res.send(order)
    })
    .catch(err=>res.status(404).send({error: err.message}))
}

const updateOrderById = (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(order => {
      if (!order) throw new Error('no such order')
      else res.send(order)
    })
    .catch(err => res.status(400).json({error: err.message}))
  
}

module.exports = {
  getAllOrders,
  getOrdersByUserId,
  addNewOrder,
  getOrderById,
  deleteOrderById,
  updateOrderById
}