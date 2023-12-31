const mongoose = require('mongoose')
// we are gonna have a model that has all the properties of our user 
const userSchema = new mongoose.Schema({
    // TODO: either add a separate admin schema or HARD CODE an admin account 
    // TODO(frontend) : establish how we want admin to see the web page ( possibly add a button admin can only see)
    // Because of MONGODB _id being automatically generated we do not require an ID field in the model
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