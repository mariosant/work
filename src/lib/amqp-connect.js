const amqplib = require('amqplib');

module.exports = async (consumer) => {
	const connection = await amqplib.connect(consumer.uri);

	const channel = await connection.createChannel();
	const {exchange} = await channel.assertExchange(consumer.exchange, 'topic', {
		durable: true,
	});

	const {queue} = await channel.assertQueue(consumer.queue, {
		durable: true,
	});

	await channel.bindQueue(queue, exchange, consumer.routingKey);

	await channel.prefetch(consumer.prefetch);

	return {
		connection,
		channel,
		exchange,
		queue,
	};
};
