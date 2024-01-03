const express = require('express')
const router = express.Router()
module.exports = router
const UserModel = require('../models/user_model')
// TO DO CHECK THE FAVOURITES


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
        password : req.body.password,
        admin : req.body.admin
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
async function getUserByLogin(req, res, next) {
    let user;
    try {

        user = await UserModel.findOne({ login: req.params.login });

        if (user == null) {
            return res.status(404).json({ message: "Cannot find product with this login" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}
// get one user
router.get('/:login', getUserByLogin, async(req,res) =>{
    res.send(res.user)
})
// delete one user (I used way too many curse words during testing)
router.delete('/:login', getUserByLogin, async(req,res) =>{
    try{
        await res.user.deleteOne()
        res.send({message : "Deleted the user"})}
    catch(err){
        res.status(500).json({message : err.message})
    }
})
