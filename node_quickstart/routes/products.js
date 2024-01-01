const express = require('express')
const router = express.Router()
module.exports = router
const ProductModel = require('../models/product_model')


async function getProduct(req,res,next) { // this is a helper function

    let prod
    try{
        prod = await ProductModel.findById(req.params.id)
        if (prod == null){
            return res.status(404).json({message : "Cannot find user"})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.prod = prod
    next()
}
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
router.get('/:id', getProduct, async(req,res) =>{
    res.send(res.prod)
})
// create a product
router.post('/', async(req,res) =>{
    const product = new ProductModel({
        name : req.body.name,
        author : req.body.author,
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
router.delete('/:id',getProduct, async(req,res) =>{
    try{
        await res.prod.deleteOne()
        res.send({message : "Deleted the product"})}
    catch(err){
        res.status(500).json({message : err.message})
    }
})
// update a product
router.patch('/:id', getProduct, async(req,res) =>{
    if (req.body.name != null){
        res.prod.name = req.body.name
    }
    if (req.body.author != null){
        res.prod.author = req.body.author
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
