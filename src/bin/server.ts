#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import http from 'http';
import config from '../config';
import app from '../app';

const debug = debugLib('server');
debug.enabled = true;

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
/**
 * server.on('error', onError);
 */

server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
	const nPort = parseInt(val, 10);

	if (isNaN(nPort)) {
		// named pipe
		return val;
	}

	if (nPort >= 0) {
		// port number
		return nPort;
	}

	return false;
}

/**
 * Event listener for HTTP server 'error' event. - agregar
 */

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
	const addr = server.address();
	const bind =
		typeof addr === 'string' ?  `pipe ${addr}` : `port ${(addr as any).port}`;
	debug(`Listening on ${bind}`);
}

export default server;
