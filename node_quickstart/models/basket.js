const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    client_id:{
        type : String,
        required: true
    },
    products_id:{
        type : Array,
        required: true
    },
    prod_amount:{
        type : Number,
        required: true
    },
    total_price:{
        type : Number,
        required: true
    },
    placed:{
        type : Boolean, // is the order placed if yes true, if not false
        required: true // TODO: have a received order screen
    }

})

module.exports = mongoose.model("Basket", orderSchema)
