require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path');
//console.log("library")
mongoose.connect("")
//console.log("mongoose connection")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
//console.log("post error")
db.once('open', () => console.log('Connected to database' ))
//console.log("connect")
app.use(express.json())
app.use(express.static("public"));
const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')
app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/orders',orderRouter)
app.post('/discover', (req, res) => {
  console.log('click')
});
app.listen(8080,() => console.log('Server Started'))
