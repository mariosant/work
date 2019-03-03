const delay = require('delay');
const {retryFor} = require('./error-handlers');

const reject = jest.fn();
const retry = jest.fn();

beforeEach(jest.clearAllMocks);

describe('error-handlers', () => {
	test('retryFor retries ', async () => {
		const message = {properties: {timestamp: Date.now()}};
		const retryForSlow = retryFor(100);

		await retryForSlow(null, message, {reject, retry});

		expect(retry).toHaveBeenCalled();
		expect(reject).not.toHaveBeenCalled();
	});

	test('retryFor rejects expired ', async () => {
		const message = {properties: {timestamp: Date.now()}};
		const retryForFast = retryFor(0.1);

		await delay(200);
		await retryForFast(null, message, {reject, retry});

		expect(retry).not.toHaveBeenCalled();
		expect(reject).toHaveBeenCalled();
	});
});
