const express = require('express')
const router = express.Router()
const { 
    getAllCakes,
    getAllCategories,
    getCakesByCategory,
    getCakeByCakeId,
    getCakeById,
    addNewCake,
    updateCakeById,
    deleteCakeById
} = require('../controllers/cakeController') 

const requireAuth = require('../middleware/requireAuth')

router.get('/sort-search-limit', getAllCakes)

router.get('/by-cakeid/:cakeid', getCakeByCakeId)

router.get('/by-category/:category', getCakesByCategory)

router.get('/all-categories', getAllCategories)

router.get('/:id', getCakeById)

router.post('/', requireAuth, addNewCake)

router.delete('/:id', requireAuth, deleteCakeById)

router.patch('/:id', requireAuth, updateCakeById)

module.exports = router;