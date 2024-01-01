const express = require('express')
const router = express.Router()
module.exports = router
const OrderModel = require('../models/basket')
// BASKET WILL BE CONSIDERED AN ORDER
// get all the orders
async function getOrder(req,res,next) {
    let order
    try{
        order = await OrderModel.findById(req.params.id)
        if (order == null){
            return res.status(404).json({message : "An order has not been created"})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.order = order
    next()
}
router.get('/', async(req,res) =>{
    try {
        const Orders = await OrderModel.find()
        res.json(Orders)
   }
   catch (err) {
        res.status(500).json({message : err.message})
   }
})
// get one order
router.get('/:id', getOrder, (req,res) =>{
    res.send(res.order)
})
// create an order
router.post('/', async(req,res) =>{
    const order = new OrderModel({
        client_id : req.body.client_id,
        products_id : req.body.products_id,
        prod_amount : req.body.prod_amount,
        total_price : req.body.total_price,
        placed : req.body.placed,

    })
    try{
        const newOrder = await order.save()
        res.status(201).json(newOrder)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
// modify an order
router.patch('/:id', getOrder, async(req,res) =>{
    if (req.body.client_id != null){
        res.order.client_id = req.body.client_id
    }
    if (req.body.products_id != null){
        res.order.products_id = req.body.products_id
    }
    if (req.body.prod_amount != null){
        res.order.prod_amount = req.body.prod_amount
    }
    if (req.body.total_price != null){
        res.order.total_price = req.body.total_price
    }
    if (req.body.placed != null){
        res.order.placed = req.body.placed
    }
    try{
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)}
    catch(err){
        res.status(400).json({message : err.message})
    }

})
// delete an order
router.delete('/:id',getOrder, async(req,res) =>{
    try{
        await res.order.deleteOne()
        res.send({message : "Deleted the order"})}
    catch(err){
        res.status(500).json({message : err.message})
    }
})
