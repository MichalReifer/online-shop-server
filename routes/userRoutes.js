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
        .catch(err => res.status(400).json({error: err.message}))
})

router.get('/by-id/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
})

router.get('/by-email/:email', (req, res) => {
    const email = req.params.email
    User.findOne({email})
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
})

router.delete('/by-id/:id', (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
})

router.delete('/by-email/:email', (req, res) => {
    const email = req.params.email
    User.findOneAndDelete({email})
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    User.findByIdAndUpdate(id, updates, {new: true})
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
})

module.exports = router;