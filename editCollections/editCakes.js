const Cake = require('../models/cake')
const fs = require('fs')
const  mongoose = require('mongoose')

// // ********add a new cake ********
// const newCake = new Cake({
//     title: "my new oreo cake3",
//     price: 1234,
//     image: fs.readFileSync(__dirname+'/oreo3.jpg')
// })

// newCake.save()
//     .then(() => console.log('User Saved Successfully!'))
//     .then(() => mongoose.connection.close(() => console.log('Connection Closed successfully!')))
//     .catch(err => console.log(err))


// // ******* update images on existing cakes *********
// const dataDir = 'D:/studying/sheCodes/Final Project/data/'
// const id = "6278d4c5b0a19c95c7a39372"

// // update specific cake with specific image:
// const image = 'oreo.jpg'
// Cake.findByIdAndUpdate(id, {image: fs.readFileSync(dataDir+'images/'+image)}, {new: true})
//     .then(result => console.log(result.title, 'updated'))
//     .catch(err => console.log(err))


// // update specific cake with its own image (has path as string):
// Cake.findById(id, (err, docs)=>{
//     if (err) console.log(err)
//     else {
//       Cake.findByIdAndUpdate(id, {image: fs.readFileSync(dataDir+docs.image.toString())}, {new: true})
//         .then(result => console.log(result.title, 'updated'))
//         .catch(err => console.log(err))  
//     }
// })


// // update all cakes with their own images:
// Cake.find().then(result =>{
//     for (const i of Object.keys(result)){
//         if (i>6){
//             const id = result[i]['id']
//             Cake.findById(id, (err, docs)=>{
//                 Cake.findByIdAndUpdate(id, {image: fs.readFileSync(dataDir+docs.image.toString())}, {new: true})
//                     .then(result => console.log(result.title, 'updated'))
//                     .catch(err => console.log(err))  
//             })
//         }
//     }
// } )