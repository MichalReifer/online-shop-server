const express = require('express')
const router = express.Router()
const { 
  getAllOrders,
  getOrdersByUserId,
  addNewOrder,
  getOrderById,
  deleteOrderById,
  updateOrderById
} = require('../controllers/orderController') 

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post('/', addNewOrder)

router.get('/', getAllOrders)

router.get('/:id', getOrderById)

router.get('/by-userid/:id', getOrdersByUserId)

router.delete('/:id', deleteOrderById)

router.patch('/:id', updateOrderById)

module.exports = router;