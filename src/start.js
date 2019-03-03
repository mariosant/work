const {is} = require('ramda');
const amqpConnect = require('./lib/amqp-connect');
const {publishTo, ackTo, nackTo} = require('./lib/queue-helpers');

const isFunc = is(Function);

const start = async consumer => {
	const {channel, exchange, queue} = await amqpConnect(consumer);
	const publish = publishTo(channel, exchange);

	const context = isFunc(consumer.init) ? await consumer.init({publish}) : {};

	const {consumerTag} = await channel.consume(queue, async message => {
		const ack = ackTo(channel, message);
		const retry = nackTo(channel, message, true);
		const reject = nackTo(channel, message, false);
		const onError = error =>
			isFunc(consumer.onError)
				? consumer.onError(error, message, {retry, reject, publish}, context)
				: reject();

		try {
			await consumer.consume(message, {retry, reject, publish}, context);
			ack();
		} catch (error) {
			onError(error);
		}
	});

	return () => channel.cancel(consumerTag);
};

module.exports = start;
