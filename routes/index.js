const express = require('express');
const cart = require('../app/cart');

const router = express.Router();

router.post('/api/cart/add', cart.addToCart);
router.post('/api/cart/get', cart.getCart);
router.delete('/api/cart/remove/user/:id/cart/:cartId', cart.removeFromCart);
router.delete('/api/cart/remove/user/:id', cart.removeAllFromCart);
router.put('/api/cart/amount/update', cart.updateAmount);

module.exports = router;