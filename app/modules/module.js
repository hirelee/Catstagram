// Invoke 'strict' JavaScript mode
"use strict";

// Instantiate Home
var app = angular.module("app", [
	"ngComponentRouter",
	"ngTouch",
	"ngResource",
	"ngSanitize"
]);

// App Config
app.config(['$locationProvider', function($locationProvider) {
    // HTML5 Mode
    $locationProvider.html5Mode(true);    
}]);

// Top Level Component
app.value("$routerRootComponent", "coreApp");