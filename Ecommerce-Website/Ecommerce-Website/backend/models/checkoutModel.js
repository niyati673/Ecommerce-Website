const mongoose = require('mongoose');

const checkoutSchema = mongoose.Schema({
    userId: String,
    items: Array, 
    totalCost: Number,
});

exports.Checkout = mongoose.model('Checkout', checkoutSchema);
