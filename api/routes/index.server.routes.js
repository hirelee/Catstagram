'use strict';

// Controller
var index = require('../controllers/index.server.controller')

// Export
module.exports = function(api) {
	// Mount
	api.get('/', index.render)
}