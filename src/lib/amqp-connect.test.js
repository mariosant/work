const amqplib = require('amqplib');
const amqpConnect = require('./amqp-connect');

jest.mock('amqplib');

beforeEach(jest.clearAllMocks);

describe('amqp-connect', () => {
	test('connects', async () => {
		await amqpConnect({
			uri: 'amqp://imagehost',
			exchange: 'exchange',
			queue: 'queue',
			prefetch: 10,
			routingKey: 'lorem.ipsum',
		});

		expect(amqplib.mocks.assertExchange).toHaveBeenCalledWith(
			'exchange',
			'topic',
			{durable: true},
		);
		expect(amqplib.mocks.assertQueue).toHaveBeenCalledWith('queue', {
			durable: true,
		});
		expect(amqplib.mocks.bindQueue).toHaveBeenCalledWith(
			'queue',
			'exchange',
			'lorem.ipsum',
		);
		expect(amqplib.mocks.prefetch).toHaveBeenCalledWith(10);
	});
});
