const {Product} = require('../models/productModel')
const express = require('express');
const router = express.Router();

router.get(`/`,async (req,res)=>{
    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList)
})
router.post(`/`,(req,res)=>{
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        cost:req.body.cost,
        description:req.body.description,
        color:req.body.color
    })

    product.save().then((createedProduct=>{
        res.status(201).json(createedProduct)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})

module.exports = router;