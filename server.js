'use strict';

// Set Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Load Module Dependencies
var express  = require('./config/express'),
    config 	 = require('./config/config.js'),
    http 	 = require('http')	 

// Create Application Instances
var api = express()

// Start Server
http.createServer(api).listen(config.port, function() {
   console.log('Express server listening on port ' + config.port);
})

// Export
module.exports = api