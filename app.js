const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cakeRoutes = require('./routes/cakeRoutes')
const userRoutes = require('./routes/userRoutes')
require('./editCollections/editCakes')


const app = express()
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8081
mongoose.connect('mongodb://localhost:27017/cake_shop', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(PORT))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World')})
  
app.use('/cakes', cakeRoutes)
app.use('/users', userRoutes)