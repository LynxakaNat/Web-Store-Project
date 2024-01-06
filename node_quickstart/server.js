require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true}));
app.use(cors())
const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')
app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/orders',orderRouter)
app.post('/search', async(req, res) =>{
  const name_of_book = req.body.name;
  const request = new Request(`http://localhost:8080/products/${name_of_book}`,{

  method: "GET",

  });
  fetch(request)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    res.send(response);
  })
  .catch((error) => {
    console.error(error);
  });


});
app.listen(8080,() => console.log('Server Started'))





