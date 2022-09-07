const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

const createToken = _id => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

const validateToken = (req, res) => {
    const bearerHeader = req.headers['authorization'];
    try {
        const token = bearerHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET)
        User.findById(decoded._id, {password:0})
            .then(user=>res.send(user))   
    } 
    catch {
        res.status(400).json({error: 'invalid token'})
    }
}

const signupUser = (req, res) => {
    User.signup(req.body)
        .then(newUser=>{
            const {name, email, admin, _id} = newUser
            const token = createToken(_id)
            res.send({_id, name, email, admin, token})
        })
        .catch(err => res.status(400).json({error: err.message}) )
}

const loginUser = (req, res) => {
    const {email, password} = req.body
    User.login(email, password)
        .then(user=>{
            const {name, email, admin, _id} = user
            const token = createToken(_id)
            res.send({_id, name, email, admin, token})
        })
        .catch(err => res.status(400).json({error: err.message}) )
}

const getAllUsers = (req, res) => {
    User.find()
        .then(result => res.send(result))
        .catch(err => res.status(400).json({error: err.message}))
}

const getUserById = (req, res) => {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
        return res.status(404).json({error: 'user id is invalid'})

    User.findById(id, {password:0})
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
}

const getUserByEmail = (req, res) => {
    const email = req.params.email
    User.findOne({email})
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
}

const deleteUserById = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
}

const updateUserById = (req, res) => {
    const id = req.params.id
    const updates = req.body
    User.findByIdAndUpdate(id, updates, {new: true})
        .then(result => {
            if (!result) throw new Error('no such user')
            else res.send(result)
        })
        .catch(err => res.status(400).json({error: err.message}))
}

module.exports = {
  validateToken,
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUserById,
}