const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');

const cart = {
	addToCart: (req, res) => {
		const {userId, name, amount = 1, value, image} = req.body;
		if (!userId || !name || !value || !image) {
			res.status(444);
			res.json({error: 'Invalid body ' + req.body});
			return;
		}
		Cart.findOne({userId, name}, (error, result) => {
			if (error) {
				res.status(444);
				res.json({error});
				return;
			}
			if (!result) {
				const cart = new Cart({userId, name, value, image, amount});
				cart.save().then((result) => {
					res.json({message: 'Add to cart success', result});
				}).catch((error) => {
					throw new Error(error);
				});
			} else {
				result.amount += amount;
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
	removeAllFromCart: (req, res) => {
		const {id} = req.params;
		Cart.deleteMany({userId: id}, (error, result) => {
			if (error) {
				res.status(444);
				res.json({error});
				return;
			}
			res.json({message: 'Delete success'});
			return;
		});
	},
	updateAmount: (req, res) => {
		const {id, cartId, amount} = req.body;
		Cart.findOne({_id: cartId, userId: id}, (error, result) => {
			if (error) {
				res.status(444);
				res.json({error});
				return;
			}
			result.amount = amount;
			result.save().then((saveResult) => {
				res.json({result: saveResult});
				return;
			}).catch((saveError) => {
				res.status(444);
				res.json({error: saveError});
				return;
			});
			return;
		});
	},
};

module.exports = cart;
