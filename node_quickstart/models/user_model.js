const mongoose = require('mongoose')
// we are gonna have a model that has all the properties of our user
const userSchema = new mongoose.Schema({
    // Because of MONGODB _id being automatically generated we do not require an ID field in the model
    login:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    },
    admin :{
        type : Boolean, // true if a user is an admin, false otherwise
        required: true
    }
    // wishlist to be discussed ???
})

module.exports = mongoose.model("User", userSchema)
