const express = require('express')
const router = express.Router()
const Cake = require('../models/cake')


router.get('/', (req, res) => {
    Cake.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})
  
router.post('/', (req, res) => {
    const cake = new Cake(req.body)
    // console.log(req.body)
    // console.log(cake)
    cake.save()
        .then(result=>{res.send(result)})
        .catch(err=>console.log(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Cake.findById(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Cake.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    Cake.findByIdAndUpdate(id, updates, {new: true})
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

module.exports = router;