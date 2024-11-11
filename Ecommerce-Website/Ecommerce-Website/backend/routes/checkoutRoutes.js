const express = require('express');
const router = express.Router();
const { createCheckoutController, getCheckoutController } = require('../controller/checkoutController');

router.post(`/createCheckout`, createCheckoutController);
router.post(`/getCheckout`, getCheckoutController);

module.exports = router;
