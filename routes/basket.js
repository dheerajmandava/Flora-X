const express = require('express')
const router = express.Router()
const plant = require('../models/plantm')
const Cart = require('../models/cart')
const Order = require('../models/order')
const isAuth = require('../config/auth')
const cart = require('../models/cart')
const Register = require('../models/registerm')
const order = require('../models/order')

router.get('/basket',isAuth,(req,res)=>{
    if(!req.session.id){
        return res.render('basket',{plants: null})
    }
   var cart = new Cart(req.session.cart)
    res.render('basket',{plants: cart.basketArray(), totalPrice: cart.totalPrice})
})
router.get('/addtocart/:id',isAuth,(req,res)=>{
    var plantid = req.params.id 
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    plant.findById(plantid,(err,plants)=>{
        if(err){
            return res.redirect('/page')
        }
        cart.add(plants, plants.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/page')
    })
})
router.get('/checkout',isAuth,(req,res)=>{
    res.render('checkout')
 
})
router.post('/checkout',isAuth,(req,res)=>{
var cart = new Cart(req.session.cart)
var order = new Order({
    cart: cart,
    user: req.register,
    name: req.body.name,
    address: req.body.address
})
order.save((err,oss)=>{
    if(err){
        console.log(err)
    }else{
        console.log('order saved') 
    }
    })
})

router.get('/profile',isAuth,(req,res)=>{
    Order.find({user: req.register},(err, orders)=>{
        if(err){
        console.log({message:err.message})
        }
        orders.forEach((order)=>{
        const cart = new Cart(order.cart)
        order.items = cart.basketArray()
    }) 
    res.render('profile',{orders: orders,name: req.user.username} ) 
})
})



module.exports = router