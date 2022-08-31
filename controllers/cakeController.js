const Cake = require('../models/cake')


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
    .then(result => res.send(result))
    .catch(err => res.status(400).json({error: err.message}))
}

const getCakeByCakeId = (req, res) => {
  const cakeId = req.params.cakeid
  Cake.findOne({cakeId}, 
      // {image: 0} // no image
    )
    .then(result => {
      if (!result) throw new Error('no such cake')
      else res.send(result)
    })
    .catch(err => res.status(404).json({error: err.message}))
}

const getCakesByCategory = (req, res) => {
  const category = req.params.category
  Cake.find({category}, 
      // {image: 0} // no image
    )
    .then(result => res.send(result))
    .catch(err => res.status(400).json({error: err.message}))
}

const getAllCategories = (req,res)=>{
  Cake.distinct('category')
    .then(result=> res.send(result))
    .catch(err => res.status(400).json({error: err.message}))
}

const addNewCake = (req, res) => {
  const cake = new Cake(req.body)
  cake.save()
    .then(result=>{res.send(result)})
    .catch(err => res.status(400).json({error: err.message}))
}

const getCakeById = (req, res) => {
  const id = req.params.id
  Cake.findById(id)
    .then(result => {
      if (!result) throw new Error('no such cake')
      else res.send(result)
    })
    .catch(err => res.status(404).json({error: err.message}))
}

const deleteCakeById = (req, res) => {
  const id = req.params.id
  Cake.findByIdAndDelete(id)
    .then(result => {
      if (!result) throw new Error('no such cake')
      else res.send(result)
    })
    .catch(err => res.status(400).json({error: err.message}))
}

const updateCakeById = (req, res) => {
  const id = req.params.id
  Cake.findByIdAndUpdate(id, req.body, {new: true})
    .then(result => {
      if (!result) throw new Error('no such cake')
      else res.send(result)
    })
    .catch(err => res.status(400).json({error: err.message}))
}

module.exports = {
  getAllCakes,
  getAllCategories,
  getCakesByCategory,
  getCakeByCakeId,
  getCakeById,
  addNewCake,
  updateCakeById,
  deleteCakeById
};