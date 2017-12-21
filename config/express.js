'use strict';

// Dependencies
var express			 = require('express'),
	ejs				 = require('ejs'),
	http			 = require('http'),
	morgan			 = require('morgan'),
	compress 		 = require('compression'),
	bodyParser  	 = require('body-parser'),
	methodOverride   = require('method-override');

// Export
module.exports = function() {

	// Express Application
	var api = express();

	// Serving Static Content
	api.use(express.static('./app'));

	// Set Morgan
	api.use(morgan('dev'));
	
	// Middleware
	api.use(bodyParser.urlencoded({
		extended: true
	}));
	api.use(bodyParser.json());
	api.use(methodOverride());

	// CORS
	api.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
	});

	// View Engine
	api.set('views', './api/views');
	api.set('view engine', 'ejs');
	api.disable('x-powered-by');

	// Load Routes
	require('../api/routes/index.server.routes.js')(api); // Index

	// Router
	api.get('*', function(req, res) {
 		res.render('index'); 
	});

	// Return Application
	return api;

}
