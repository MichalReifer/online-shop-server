const express = require('express')
const mongoose = require('mongoose')
const Cake = require('./models/cake')
const cors = require('cors');


const app = express()
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/cake_shop')
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World')})
  
app.get('/cakes', (req, res) => {
    Cake.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})
  
app.post('/cakes', (req, res) => {
    const cake = new Cake(req.body)
    // console.log(req.body)
    // console.log(cake)
    cake.save()
        .then(result=>{res.send(result)})
        .catch(err=>console.log(err))
})

app.get('/cakes/:id', (req, res) => {
    const id = req.params.id
    Cake.findById(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

app.delete('/cakes/:id', (req, res) => {
    const id = req.params.id
    Cake.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

app.patch('/cakes/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    Cake.findByIdAndUpdate(id, updates, {new: true})
        .then(result => res.send(result))
        .catch(err => console.log(err))
})




