const express = require('express')
const router = express.Router()
const User = require('../models/registerm')
const bcrypt = require('bcrypt')
const passport = require('passport')
const isAuth = require('../config/auth')
const order = require('../models/order')
const Cart = require('../models/cart')

//home
router.get('/knowmore',(req,res)=>{
    res.render('knowmore')
})
//login
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/home',isAuth,(req,res)=>{
    res.render('home',{name: req.user.username})
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash: true
    })(req,res,next)
})

//register
router.get('/register',(req,res)=>{
    res.render('register')
})


router.post('/register', async (req,res)=>{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const {username,email} = req.body
    const user = new User({
        username:username,
        email:email,
        password:hashedPassword
    })   
    const regUser = await user.save()
    res.redirect('/login')
    } catch (error) {
        console.log({message: err.message});
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if(err) {
            return next(err);
        } else {
            req.session = null;
            console.log("logout successful");
            return res.redirect('/login');
        }
    });
})
module.exports = router