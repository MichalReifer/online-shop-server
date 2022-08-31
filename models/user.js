const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true
    },
    address:{
        type: String,
        required: false
    },
}, {timestamps: true})


userSchema.statics.signup = async function(newUser) {

    if (!newUser.email || !newUser.password)
        throw Error('All fields must be filled')

    if (!validator.isEmail(newUser.email))
        throw Error('Email is not valid')

    if (newUser.password.length < 6 )
        throw Error('Password must be at least 6 characters long')

    return this.findOne({email: newUser.email})
        .then(exists => {
            if (exists) throw Error('Email already in use')
            else return bcrypt.genSalt(10)
        })
        .then(salt => bcrypt.hash(newUser.password, salt))
        .then(hash => this.create({ ...newUser, password: hash }))
}

const User = mongoose.model('User', userSchema)

module.exports = User;