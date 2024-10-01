const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }, 
    image: { type: String, required: true },         
    promotionPrice: { type: Number } 
    

})

module.exports = mongoose.model('Products', Schema)