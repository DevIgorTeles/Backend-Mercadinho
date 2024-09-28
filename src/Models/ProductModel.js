const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    code:{type: String, required: true, unique:true},
    name:{type: String, required:true},
    price:{type: Number, required:true}
    

})

module.exports = mongoose.model('Products', Schema)