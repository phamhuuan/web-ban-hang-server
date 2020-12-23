const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');

const cart = {
	addToCart: (req, res) => {
		const {userId, name, value, image} = req.body;
		Cart.findOne({userId, name}, (error, result) => {
			if (error) {
				res.json({error});
				return;
			}
			if (!result) {
				const cart = new Cart({userId, name, value, image, amount: 1});
				cart.save().then((result) => {
					res.status(201);
					res.json({message: 'Add to cart success', result});
				}).catch((error) => {
					throw new Error(error);
				});
			} else {
				result.amount++;
				result.overwrite(result);
				result.save().then((result) => {
					res.status(201);
					res.json({message: 'Add to cart success', result});
				}).catch((error) => {
					res.json({error});
					return;
				});
			}
		});
	},
};

module.exports = cart;
