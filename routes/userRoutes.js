const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', (req, res) => {
    User.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})
  
router.post('/', (req, res) => {
    const user = new User(req.body)
    // console.log(req.body)
    // console.log(user)
    user.save()
        .then(result=>{res.send(result)})
        .catch(err=>console.log(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    User.findByIdAndUpdate(id, updates, {new: true})
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

module.exports = router;