const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cakeRoutes = require('./routes/cakeRoutes')


const app = express()
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/cake_shop')
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World')})
  
app.use('/cakes', cakeRoutes)