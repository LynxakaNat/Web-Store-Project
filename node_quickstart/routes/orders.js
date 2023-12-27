const express = require('express')
const router = express.Router()
module.exports = router

// BASKET WILL BE CONSIDERED AN ORDER
// get order
router.get('/', (req,res) =>{
    res.send('Getting all the orders')
})
// get one order
router.get('/:id', (req,res) =>{
    res.send('Getting one order by ID')
})
// create an order
router.post('/', (req,res) =>{
    res.send('Created order')
})
// modify an order
router.patch('/:id', (req,res) =>{
    res.send('Updated an order')
})
// delete an order
router.delete('/:id', (req,res) =>{
    res.send('Deleted an order')
})