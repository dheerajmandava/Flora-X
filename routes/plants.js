const express = require('express')
const isAuth = require('../config/auth')
const route = express.Router()
const Plant = require('../models/plantm')


route.get('/page',isAuth,(req,res)=>{
    Plant.find({},(err,plants)=>{
        if(err){
            res.send(err)
        }
        else{
            res.render('page',{'Plant': plants})
        }
    })
})
route.get('/addplant',isAuth,(req,res)=>{
    res.render('plants')
})
route.post('/addplant',isAuth,async(req,res)=>{
     const plant = new Plant(req.body)
     try{
         const newplant = await plant.save()
         console.log(newplant)
     }catch(err){
        console.log('errorPlantType')
     }
})

module.exports = route