const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');

const cart = {
	addToCart: (req, res) => {
		const {userId, name, value, image} = req.body;
		Cart.findOne({userId, name}, (error, result) => {
			if (error) {
				res.status(444);
				res.json({error});
				return;
			}
			if (!result) {
				const cart = new Cart({userId, name, value, image, amount: 1});
				cart.save().then((result) => {
					res.json({message: 'Add to cart success', result});
				}).catch((error) => {
					throw new Error(error);
				});
			} else {
				result.amount++;
				result.overwrite(result);
				result.save().then((result) => {
					res.json({message: 'Add to cart success', result});
				}).catch((error) => {
					res.status(444);
					res.json({error});
					return;
				});
			}
		});
	},
	getCart: (req, res) => {
		const {userId} = req.body;
		Cart.find({userId}, (error, result) => {
			if (error) {
				res.status(444);
				res.json({error});
				return;
			}
			res.json({result});
			return;
		});
	},
	removeFromCart: (req, res) => {
		const {id, cartId} = req.params;
		Cart.deleteOne({_id: cartId, userId: id}, (error, result) => {
			if (error) {
				res.status(444);
				res.json({error});
				return;
			}
			res.json({message: 'Delete success'});
			return;
		});
	},
};

module.exports = cart;
