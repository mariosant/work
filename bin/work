#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');
const ora = require('ora');
const start = require('../src/start');

const args = yargs.demandCommand(1).usage('Usage: work consumer-file.js').argv;

const run = async () => {
	const script = args._[0];
	const worker = require(path.resolve(process.cwd(), script));
	const status = ora();

	status.start(`Starting worker ${script}...`);
	await start(worker);
	status.succeed('Worker started');

	console.log('Listening for tasks.');
};

run(args);
