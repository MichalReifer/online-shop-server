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
    const {email, password} = newUser
    
    if (!email || !password)
        throw Error('All fields must be filled')

    if (!validator.isEmail(email))
        throw Error('Email is not valid')

    if (password.length < 6 )
        throw Error('Password must be at least 6 characters long')

    return this.findOne({email})
            .then(exists => {
                if (exists) 
                    throw Error('Email already in use')})
            .then(() => bcrypt.genSalt(10))
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => this.create({ ...newUser, admin: false, password: hash }))
}

userSchema.statics.login = async function(email, password) {

    if (!email || !password)
        throw Error('All fields must be filled')

    const user = await this.findOne({email})    
    const passwordMatch = user ? await bcrypt.compare(password, user.password) : null
    
    if (!user || !passwordMatch) 
        throw Error('Incorrect email or password')

    return user 
}

const User = mongoose.model('User', userSchema)

module.exports = User;