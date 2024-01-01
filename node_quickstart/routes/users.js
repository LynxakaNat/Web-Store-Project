const express = require('express')
const router = express.Router()
module.exports = router
const UserModel = require('../models/user_model')
// TO DO CHECK THE FAVOURITES
async function getUser(req,res,next) { // this is a helper function
    // gets the user which allows for quicker deletion/modification/view
    let user
    try{
        user = await UserModel.findById(req.params.id)
        if (user == null){
            return res.status(404).json({message : "Cannot find user"})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}
// get all the users .../users/
router.get('/', async (req,res) =>{
   try {
        const Users = await UserModel.find()
        res.json(Users)
   }
   catch (err) {
        res.status(500).json({message : err.message})
   }
})
// create a user
router.post('/', async (req,res) =>{
    const user = new UserModel({
        login : req.body.login,
        password : req.body.password
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
// get one user
router.get('/:id', getUser, (req,res) =>{
    res.send(res.user)
})
// delete one user (I used way too many curse words during testing)
router.delete('/:id', getUser, async(req,res) =>{
    try{
        await res.user.deleteOne()
        res.send({message : "Deleted the user"})}
    catch(err){
        res.status(500).json({message : err.message})
    }
})
