const webSocket = require('ws');
const Payment = require('./payment');

const websocket = new webSocket('wss://s.altnet.rippletest.net:51233');
const subscribeCommand = '{"command":"subscribe","id":0,"accounts":["rwNrJYKPFi21rWnWZDyiSGi1JGi9YDzMnX"]}'


function connect() {
	const websocket = new webSocket('wss://s.altnet.rippletest.net:51233');
	websocket.on('open', function() {
		console.log('connected to the ripple testnet network');
		websocket.send(subscribeCommand);
	});
	websocket.on('message', function(message) {
		try {
			const payment = new Payment(message);
			console.log(payment.toJSON());
		} catch(err) {
			console.log('error', err);
		}
	});
	websocket.on('close', function() {
		connect();
	});
}


connect();
