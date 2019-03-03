const getContent = require('./get-content');

const jsonMessage = {
	properties: {
		contentType: 'application/json',
	},
	content: Buffer.from(JSON.stringify({data: 'lorem ipsum'})),
};

const textMessage = {
	content: Buffer.from('lorem ipsum'),
};

describe('getContent', () => {
	test('parses json messages', () => {
		expect(getContent(jsonMessage)).toEqual({data: 'lorem ipsum'});
	});

	test('parses plain messages', () => {
		expect(getContent(textMessage)).toEqual('lorem ipsum');
	});
});
