const {is} = require('ramda');

const publishTo = (channel, exchange) => (topic, payload) =>
	is(Object, payload)
		? channel.publish(exchange, topic, Buffer.from(JSON.stringify(payload)), {
				contentType: 'application/json',
				timestamp: Date.now(),
		  })
		: channel.publish(exchange, topic, Buffer.from(payload), {
				contentType: 'text/plain',
				timestamp: Date.now(),
		  });

const ackTo = (channel, message) => () => channel.ack(message, false);

const nackTo = (channel, message, requeue) => () =>
	channel.nack(message, false, requeue);

module.exports = {
	publishTo,
	ackTo,
	nackTo,
};
