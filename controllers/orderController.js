const Order = require('../models/order')
const mongoose = require('mongoose')


const getAllOrders = (req, res) => {
  const userName = new RegExp(req.query.name, 'i');
  const authUser = req.user
  if(!authUser.admin)
    return res.status(400).json({error: 'you are not authorized to access this data'})   

  Order.find({userName})
    .sort({createdAt:-1})
    .then(orders=>res.send(orders))
    .catch(err=>res.status(404).send({error: err.message}))
}

const getOrdersByUserId = (req, res) => {
  const authUser = req.user
  const userId = req.params.id
  if (!mongoose.isValidObjectId(userId)) 
    return res.status(400).send({error: 'user id is not valid'})

  Order.find({userId})
    .sort({createdAt:-1})
    .then(orders=>{
      if(authUser.admin || authUser._id == userId)
        return res.send(orders)
      else throw new Error('you are not authorized to access this data')
    })
    .catch(err=>res.status(404).send({error: err.message}))
}

const addNewOrder = (req, res) => {
  const authUser = req.user
  Order.create({userId: authUser._id, userName: authUser.name, ...req.body})
    .then(order=> res.send(order))
    .catch(err => res.status(400).json({error: err.message}))
}

const getOrderById = (req, res) => {
  const authUser = req.user
  const orderId = req.params.id
  if (!mongoose.isValidObjectId(orderId)) 
    return res.status(400).send({error: 'order id is not valid'})

  Order.findById(orderId)
    .then(order=>{
      if (!order) 
        throw Error('no such order')
      else if(!authUser.admin && !authUser._id.equals(order.userId))
        throw new Error('you are not authorized to access this data')   
      else return res.send(order)
    })
    .catch(err=>res.status(404).send({error: err.message}))
}

const deleteOrderById = (req, res) => {
  const authUser = req.user  
  if (!authUser.admin)
    return res.status(400).json({error: 'you are not authorized to perform this action'})   

  const orderId = req.params.id
  if (!mongoose.isValidObjectId(orderId)) 
    return res.status(400).send({error: 'order id is not valid'})

  Order.findByIdAndDelete(orderId)
    .then(order=>{
      if (order) return res.send(order)
      else throw Error('no such order')
    })
    .catch(err=>res.status(400).send({error: err.message}))
}

const updateOrderById = (req, res) => {
  const authUser = req.user  
  if (!authUser.admin)
    return res.status(400).json({error: 'you are not authorized to perform this action'})   

  const orderId = req.params.id
  if (!mongoose.isValidObjectId(orderId)) 
    return res.status(400).send({error: 'order id is not valid'})

  Order.findByIdAndUpdate(orderId, req.body, {new: true})
    .then(order=>{
      if (order) return res.send(order)
      else throw Error('no such order')
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