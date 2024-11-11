const { Checkout } = require('../models/checkoutModel');

const createCheckoutController = async (req, res) => {
    try {
        const { userId, items, totalCost } = req.body;

        const checkoutData = {
            userId,
            items,
            totalCost,
        };

        const checkout = await Checkout.findOneAndUpdate({ userId }, checkoutData, { new: true, upsert: true });

        res.status(201).send({
            success: true,
            message: 'Checkout Created/Updated Successfully',
            checkout,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error While Creating/Updating Checkout',
            error,
        });
    }
};

const getCheckoutController = async (req, res) => {
    try {
        const { userId } = req.body;
        const checkoutData = await Checkout.findOne({ userId });
        res.status(200).send({
            success: true,
            checkoutData,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error While Getting Checkout Data',
            error,
        });
    }
};

module.exports = {
    createCheckoutController,
    getCheckoutController,
};
