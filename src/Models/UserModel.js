const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    code:{type: String, required: true, unique:true},
    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true}
    

})

module.exports = mongoose.model('User', Schema)