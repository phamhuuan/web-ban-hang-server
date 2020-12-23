const express = require('express');
const cart = require('../app/cart');

const router = express.Router();

router.post('/api/addToCart', cart.addToCart);

module.exports = router;