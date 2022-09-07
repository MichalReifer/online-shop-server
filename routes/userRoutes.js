const express = require('express')
const router = express.Router()
const {
    validateToken,
    signupUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUserById,
    updateUserById,
} = require('../controllers/userController')


router.post('/validate-token', validateToken)

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/', getAllUsers)
  
router.get('/by-id/:id', getUserById)

router.get('/by-email/:email', getUserByEmail)

router.delete('/by-id/:id', deleteUserById)

router.patch('/:id', updateUserById)

module.exports = router;