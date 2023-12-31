const mongoose = require('mongoose')
// we are gonna have a model that has all the properties of our user 
const userSchema = new mongoose.Schema({
    
    login:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)