const {Cart} = require('../models/cartModel');

const updateCartController = async (req, res) => {
    try {
        const { cart, id } = req.body;
        
        const data = {
            userId: id,
            data: cart,
        }

        const cartData = await Cart.findOneAndUpdate({ userId: id }, data, { new: true, upsert: true });

        res.status(201).send({
            success: true,
            message: 'Cart Updated Successfully',
            cartData,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error While Updating Cart',
            error,
        });
    }
}

const getCartController = async (req, res) => {
    try {
        const { id } = req.body;
        const cartData = await Cart.findOne({ userId: id });
        res.status(200).send({
            success: true,
            cartData,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error While Getting Cart',
            error,
        });
    } 
}

module.exports = {
    updateCartController,
    getCartController,
}