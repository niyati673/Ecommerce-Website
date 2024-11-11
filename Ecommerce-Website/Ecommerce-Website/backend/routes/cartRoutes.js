const express = require('express');
const router = express.Router();
const {getCartController, updateCartController} = require('../controller/cartController')


router.post(`/updateCart`, updateCartController)
router.post(`/getCart`, getCartController)

module.exports = router;