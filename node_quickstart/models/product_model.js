const mongoose = require('mongoose')
// we are gonna have a model that has all the properties of our products
const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
        text: true // we only enable it for name because we only wanna search by name
        // not by any other property
    },
    author:{
        type : String,
        required: true
    },
    genre :{
        type : String,
        required: true
    },
    description:{
        type : String,
        required: false // TODO: discuss
    },
    price:{
        type : Number,
        required: true
    }, // Because of MONGODB _id being automatically generated we do not require a field in the model
    stock:{
        type : Number,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema)
