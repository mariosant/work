const {pathOr} = require('ramda');

const getTimestamp = pathOr(0, ['properties', 'timestamp']);

const retryFor = (seconds) => async (error, message, {reject, retry}) => {
	const runningFor = (Date.now() - getTimestamp(message)) / 1000;
	console.error(error);

	return runningFor > seconds ? reject() : retry();
};

module.exports = {
	retryFor,
};
