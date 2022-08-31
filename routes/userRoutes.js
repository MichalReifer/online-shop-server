const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    addNewUser,
    deleteUserById,
    updateUserById,
} = require('../controllers/userController')


router.get('/', getAllUsers)
  
router.post('/', addNewUser)

router.get('/by-id/:id', getUserById)

router.get('/by-email/:email', getUserByEmail)

router.delete('/by-id/:id', deleteUserById)

router.patch('/:id', updateUserById)

module.exports = router;