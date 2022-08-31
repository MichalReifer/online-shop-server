const User = require('../models/user')


const getAllUsers = (req, res) => {
    User.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
}
  
const addNewUser =  (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(result=>{res.send(result)})
        .catch(err => res.status(400).json({error: err.message}))
}

const getUserById = (req, res) => {
    const id = req.params.id
    User.findById(id)
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
  getAllUsers,
  getUserById,
  getUserByEmail,
  addNewUser,
  deleteUserById,
  updateUserById,
}