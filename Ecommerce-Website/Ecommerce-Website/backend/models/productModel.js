const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    category:String,
    cost:String,
    description:String,
    color:String
})


const cartSchema = mongoose.Schema({
    userId:String,
    data:String
})

exports.Product = mongoose.model('Product', productSchema)
exports.Cart = mongoose.model('Cart', cartSchema)
