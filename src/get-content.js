const {ifElse, pathEq} = require('ramda');

const isMessageJson = pathEq(['properties', 'contentType'], 'application/json');

/**
 * Gets content from message. It automatically parses it too.
 * @param {message} AMQP message
 * @returns {Object} Message content
 */
const getContent = ifElse(
	isMessageJson,
	(message) => JSON.parse(message.content.toString()),
	(message) => message.content.toString(),
);

module.exports = getContent;
