const express = require('express');
const cart = require('../app/cart');

const router = express.Router();

router.post('/api/cart/add', cart.addToCart);
router.post('/api/cart/get', cart.getCart);
router.delete('/api/cart/remove/user/:id/card/:cartId', cart.removeFromCart);

module.exports = router;