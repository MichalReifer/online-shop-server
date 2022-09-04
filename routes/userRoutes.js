const express = require('express')
const router = express.Router()
const {
    signupUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    addNewUser,
    deleteUserById,
    updateUserById,
} = require('../controllers/userController')


router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/', getAllUsers)
  
router.post('/', addNewUser)

router.get('/by-id/:id', getUserById)

router.get('/by-email/:email', getUserByEmail)

router.delete('/by-id/:id', deleteUserById)

router.patch('/:id', updateUserById)

module.exports = router;