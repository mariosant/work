const {publishTo, ackTo, nackTo} = require('./queue-helpers');

const publishMock = jest.fn();
const ackMock = jest.fn();
const nackMock = jest.fn();

const channel = {
	publish: publishMock,
	ack: ackMock,
	nack: nackMock,
};

beforeEach(jest.clearAllMocks);

describe('queue-helpers', () => {
	test('publishTo', () => {
		const publish = publishTo(channel, 'exchange');
		publish('topic', 'payload');

		expect(publishMock).toHaveBeenCalledWith(
			'exchange',
			'topic',
			expect.any(Object),
			{
				contentType: 'text/plain',
				timestamp: expect.any(Number),
			},
		);
	});
	test('publishTo json', () => {
		const publish = publishTo(channel, 'exchange');
		publish('topic', {payload: 'payload'});

		expect(publishMock).toHaveBeenCalledWith(
			'exchange',
			'topic',
			expect.any(Object),
			{
				contentType: 'application/json',
				timestamp: expect.any(Number),
			},
		);
	});

	test('ackTo', () => {
		const ack = ackTo(channel, 'message');
		ack();

		expect(ackMock).toHaveBeenCalledWith('message', false);
	});

	test('nackTo', () => {
		const nack = nackTo(channel, 'message', false);
		nack();

		expect(nackMock).toHaveBeenCalledWith('message', false, false);
	});
});
