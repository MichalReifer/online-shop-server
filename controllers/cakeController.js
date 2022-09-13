const Cake = require('../models/cake')
const fs = require('fs')


const getAllCakes = (req, res) => {
  const { page, limit, value } = req.query
  // console.log(req.url)
  const searchRegExp = new RegExp(value, 'i');
  Cake.find({'title': searchRegExp}, 
      // {image:0} // no image
    )
    .sort('title')
    .skip(page*limit)
    .limit(limit)
    .then(cakes => res.send(cakes))
    .catch(err => res.status(400).json({error: err.message}))
}

const getCakesByCakeIdList = async (req, res) => {
  const cakeIdList = req.params.list.split('+')
  try {
    const cakes = await Promise.all(cakeIdList.map(async cakeId=>
      await Cake.findOne({cakeId})
    ))
    res.send(cakes)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getCakeByCakeId = (req, res) => {
  const cakeId = req.params.cakeid
  Cake.findOne({cakeId})
    .then(cake => {
      if (!cake) throw new Error('no such cake')
      else res.send(cake)
    })
    .catch(err => res.status(404).json({error: err.message}))
}

const getCakesByCategory = (req, res) => {
  const category = req.params.category
  Cake.find({category})
    .then(cakes => res.send(cakes))
    .catch(err => res.status(400).json({error: err.message}))
}

const getAllCategories = (req,res)=>{
  Cake.distinct('category')
    .then(categories=> res.send(categories))
    .catch(err => res.status(400).json({error: err.message}))
}

const addNewCake = (req, res) => {
  const authUser = req.user
  if (!authUser.admin)
    return res.status(400).json({error: 'you are not authorized to perform this action'})   

  const cake = new Cake(req.body)
  cake.save()
    .then(cake => res.send(cake))
    .catch(err => res.status(400).json({error: err.message}))
}

const getCakeById = (req, res) => {
  const id = req.params.id
  Cake.findById(id)
    .then(cake => {
      if (cake) res.send(cake)
      else throw new Error('no such cake')
    })
    .catch(err => res.status(404).json({error: err.message}))
}

const deleteCakeById = (req, res) => {
  const authUser = req.user
  const id = req.params.id

  if (!authUser.admin)
    return res.status(400).json({error: 'you are not authorized to perform this action'})   
  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({error: 'cake id is invalid'})

  Cake.findByIdAndDelete(id)
    .then(cake => {
      if (cake) res.send(cake)
      else throw new Error('no such cake')
    })
    .catch(err => res.status(400).json({error: err.message}))
}

const updateCakeById = (req, res) => {
  const authUser = req.user
  const id = req.params.id

  if (!authUser.admin)
    return res.status(400).json({error: 'you are not authorized to perform this action'})   
  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({error: 'cake id is invalid'})

  Cake.findByIdAndUpdate(id, req.body, {new: true})
    .then(cake => {
      if (cake) res.send(cake)
      else throw new Error('no such cake')
    })
    .catch(err => res.status(400).json({error: err.message}))
}

module.exports = {
  getAllCakes,
  getCakesByCakeIdList,
  getAllCategories,
  getCakesByCategory,
  getCakeByCakeId,
  getCakeById,
  addNewCake,
  updateCakeById,
  deleteCakeById
};