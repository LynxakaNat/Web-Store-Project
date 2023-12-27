const express = require('express')
const router = express.Router()
module.exports = router


// get all the users
router.get('/', (req,res) =>{
    res.send('Getting all the users')
})
// get one user
router.get('/:id', (req,res) =>{
    res.send('Getting one user by ID')
})
// create a user
router.post('/', (req,res) =>{
    res.send('Created user')
})