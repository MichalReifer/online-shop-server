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


router.get('/sort-search-limit', getAllCakes)

router.get('/by-cakeid/:cakeid', getCakeByCakeId)

router.get('/by-category/:category', getCakesByCategory)

router.get('/all-categories', getAllCategories)

router.post('/', addNewCake)

router.get('/:id', getCakeById)

router.delete('/:id', deleteCakeById)

router.patch('/:id', updateCakeById)

module.exports = router;