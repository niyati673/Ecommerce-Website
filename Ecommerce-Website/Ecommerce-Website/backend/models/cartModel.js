const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    userId:String,
    data:String
})

exports.Cart = mongoose.model('Carts', cartSchema)
