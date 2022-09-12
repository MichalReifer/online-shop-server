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

const requireAuth = require('../middleware/requireAuth')


router.post('/validate-token', validateToken)

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/', requireAuth, getAllUsers)
  
router.get('/by-id/:id', requireAuth, getUserById)

router.get('/by-email/:email', requireAuth, getUserByEmail)

router.delete('/by-id/:id', requireAuth, deleteUserById)

router.patch('/:id', requireAuth, updateUserById)

module.exports = router;