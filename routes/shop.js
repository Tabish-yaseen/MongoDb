const express=require('express')
const route=express.Router()
const shopController=require('../controllers/shop')

route.post('/product',shopController.addProduct)

module.exports=route