const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	userId: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

mongoose.model('Cart', cartSchema);
