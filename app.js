const express = require('express')
const mongoose = require('mongoose')

const cakeRoutes = require('./routes/cakeRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

require('dotenv').config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(process.env.PORT))
    .catch(err => console.log(err))

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
app.use('/cakes', cakeRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)