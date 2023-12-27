const express = require('express')
const router = express.Router()
module.exports = router
// ID 

// get all the products
router.get('/', (req,res) =>{
    res.send('Getting all the products')
})
// get one products
router.get('/:id', (req,res) =>{
    res.send('Getting one product by ID')
})
// create a product
router.post('/', (req,res) =>{
    res.send('Created a product')
})
// delete a product
router.delete('/:id', (req,res) =>{
    res.send('Deleted a product')
})
// update a product
router.patch('/:id', (req,res) =>{
    res.send('Updated a product')
})