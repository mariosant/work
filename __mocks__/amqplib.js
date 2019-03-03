const mocks = {
	assertExchange: jest.fn(() => ({exchange: 'exchange'})),
	assertQueue: jest.fn(() => ({queue: 'queue'})),
	bindQueue: jest.fn(),
	prefetch: jest.fn(),
	publish: jest.fn(),
	ack: jest.fn(),
	nack: jest.fn(),
};

module.exports = {
	mocks,
	connect: () => ({
		createChannel: () => mocks,
	}),
};
