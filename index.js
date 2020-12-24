const express = require('express');
const mongoose = require('mongoose');
const {MONGOURI} = require('./key');

require('./models/cart');

const app = express();

app.use(express.json());

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('connected to mongo');
});
mongoose.connection.on('error', (error) => {
	console.log('connect to mongo error', error);
});

app.all('/*', function(req, res, next) {
	// CORS headers
	res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header(
		'Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization', 
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

app.use(require('./routes'));
app.listen(process.env.PORT || 4000);