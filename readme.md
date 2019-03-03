# Work

> Guaranteed to do the work!

[![NPM version](https://img.shields.io/npm/v/@mariosant/work.svg)](https://www.npmjs.com/package/@mariosant/work)
[![Build Status](https://travis-ci.org/mariosant/work.svg?branch=master)](https://travis-ci.org/mariosant/work)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Work is a framework for developing processing systems that rely on RabbitMQ. It provides the developer a simplified set of tools to build

## Installation

Add `@mariosant/work` to your `package.json`.

```bash
$ npm install @mariosant/work
```

For local development, you might want run an instance of Rabbit MQ, via docker.

## Usage

The idea is pretty simple. Develop modules that consume messages and run them via a cli tool or programmatically.

```javascript
// consumer.js
const {getContent} = require('@mariosant/work')
const consume = (message. {publish, retry, reject}, context) => {
	const content = getContent(message);

	// Process the message here. No need to return anything.
	// Async/await is fully supported.

	// If you need to retry processing, call retry()
	// If you need to discard the message, call reject()
	// And if you need to publish a new message, call publish(topic, content)
};

const init = ({publish}) => {
	// anything you return here, it is going to be available in the consume's context
}

// Export the following
module.exports = {
	consume,
	init,
	uri: 'amqp://guest:guest@localhost',
	exchange: 'test-exchange',
	queue: 'service-name',
	routingKey: 'records.#',
};
```

And run it:
```bash
$ npx work consumer.js
```

## Development

Easy-peasy!

```bash
$ yarn install        # to install dependencies
$ yarn test           # to run the test suite
$ docker-compose up   # run a local Rabbit MQ instance
```

## Meta

Marios Antonoudiou – [@marios_ant](https://twitter.com/marios_ant) – mariosant@sent.com

Distributed under the MIT license.

[https://github.com/mariosant/work](https://github.com/mariosant/work)

## Contributing

1. Fork it (<https://github.com/mariosant/work/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes using a semantic commit message. I include a `yarn commit` script to help you out.
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
