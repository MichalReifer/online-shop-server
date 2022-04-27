const express = require('express')
const router = express.Router()
const Cake = require('../models/cake')


router.get('/cakes', (req, res) => {
    Cake.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})
  
router.post('/cakes', (req, res) => {
    const cake = new Cake(req.body)
    // console.log(req.body)
    // console.log(cake)
    cake.save()
        .then(result=>{res.send(result)})
        .catch(err=>console.log(err))
})

router.get('/cakes/:id', (req, res) => {
    const id = req.params.id
    Cake.findById(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.delete('/cakes/:id', (req, res) => {
    const id = req.params.id
    Cake.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.patch('/cakes/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    Cake.findByIdAndUpdate(id, updates, {new: true})
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

module.exports = router;