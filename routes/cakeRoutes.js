const express = require('express')
const router = express.Router()
const Cake = require('../models/cake')


router.get('/', (req, res) => {
    Cake.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.get('/sort-search-limit', (req, res) => {
    const { page, limit, value } = req.query
    console.log(req.url)
    const searchRegExp = new RegExp(value, 'i');
    Cake.find(
            {'title': searchRegExp}, 
            // {image:0} // no image
        )
        .sort('title')
        .skip(page*limit)
        .limit(limit)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.get('/by-category/:category', (req, res) => {
    const category = req.params.category
    Cake.find({category}, {image: 0})
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.get('/all-categories', (req,res)=>{
    Cake.distinct('category')
        .then(result=> res.send(result))
        .catch(err=>console.log(err))
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