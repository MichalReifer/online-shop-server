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
    const authUser = req.user
    if(!authUser.admin)
        return res.status(400).json({error: 'you are not authorized to access this data'})   

    User.find()
        .then(users=>res.send(users))
        .catch(err => res.status(400).json({error: err.message}))
}

const getUserById = (req, res) => {
    const id = req.params.id
    const authUser = req.user
    
    if (!mongoose.isValidObjectId(id))
        return res.status(404).json({error: 'user id is invalid'})
    if(!authUser.admin && !authUser._id.equals(id))
        return res.status(400).json({error: 'you are not authorized to access this data'})   

    User.findById(id, {password:0})
        .then(user=>{
            if (user) return res.send(user)
            else throw Error('no such user')
        })
        .catch(err => res.status(400).json({error: err.message}))
}

const getUserByEmail = (req, res) => {
    const email = req.params.email
    const authUser = req.user

    User.findOne({email})
        .then(user=>{
            if (!user) 
                throw Error('no such user')
            else if(!authUser.admin && !authUser._id.equals(user._id))
                throw Error('you are not authorized to access this data')       
            else 
                return res.send(user)
        })
        .catch(err => res.status(400).json({error: err.message}))
}

const deleteUserById = (req, res) => {
    const id = req.params.id
    const authUser = req.user

    if (!mongoose.isValidObjectId(id))
        return res.status(404).json({error: 'user id is invalid'})
    if(!authUser.admin && !authUser._id.equals(id))
        return res.status(400).json({error: 'you are not authorized to perform this action'})   

    User.findByIdAndDelete(id)
        .then(user=>{
            if (user) return res.send(user)
            else throw Error('no such user')
        })
        .catch(err => res.status(400).json({error: err.message}))
}

const updateUserById = (req, res) => {
    const updates = req.body
    const id = req.params.id
    const authUser = req.user

    if (!mongoose.isValidObjectId(id))
        return res.status(404).json({error: 'user id is invalid'})
    if(!authUser.admin && !authUser._id.equals(id))
        return res.status(400).json({error: 'you are not authorized to perform this action'})   

    User.findByIdAndUpdate(id, updates, {new: true})
        .then(user=>{
            if (user) return res.send(user)
            else throw Error('no such user')
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