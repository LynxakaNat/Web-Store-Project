const express = require('express')
const router = express.Router()
module.exports = router
const ProductModel = require('../models/product_model')

async function getProductByName(req, res, next) {
    let prod; //req.params.name
    try {

        prod = await ProductModel.find({ $text: { $search: req.params.name } });

        if (prod == null) {
            return res.status(404).json({ message: "Cannot find product with this name" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.prod = prod;
    next();
}
router.get('/:name', getProductByName, async(req,res) =>{
    res.send(res.prod)
})
// get all the products
router.get('/', async(req,res) =>{
    try {
        const Products = await ProductModel.find()
        res.json(Products)
   }
   catch (err) {
        res.status(500).json({message : err.message})
   }
})
// get one product

//router.get('/:id', getProduct, async(req,res) =>{
//    res.send(res.prod) search by id I guess if needed IM LOSINGMYMIND
//})
// create a product
router.post('/', async(req,res) =>{
    const product = new ProductModel({
        name : req.body.name,
        author : req.body.author,
        genre : req.body.genre,
        description : req.body.description,
        price : req.body.price,
        stock : req.body.stock
    })
    try{
        const newProd = await product.save()
        res.status(201).json(newProd)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
// delete a product
router.delete('/:name', getProductByName, async(req,res) =>{
    try{
        await res.prod.deleteOne()
        res.send({message : "Deleted the product"})}
    catch(err){
        res.status(500).json({message : err.message})
    }
})
// update a product
router.patch('/:name',  getProductByName, async(req,res) =>{
    if (req.body.name != null){
        res.prod.name = req.body.name
    }
    if (req.body.author != null){
        res.prod.author = req.body.author
    }
    if (req.body.genre != null){
        res.prod.genre = req.body.genre
    }
    if (req.body.description != null){
        res.prod.description = req.body.description
    }
    if (req.body.price != null){
        res.prod.price = req.body.price
    }
    if (req.body.stock != null){
        res.prod.stock = req.body.stock
    }
    try{
        const updatedProd = await res.prod.save()
        res.json(updatedProd)}
    catch(err){
        res.status(400).json({message : err.message})
    }

})
