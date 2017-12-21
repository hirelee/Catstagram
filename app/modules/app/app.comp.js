// Invoke 'strict' JavaScript mode
"use strict";

// =================
// App Configuration
// =================

angular.module("app")	
.config(['$httpProvider','$locationProvider' , function($httpProvider, $locationProvider) {
   	
   	// Auth Intercepter (Would go here)

}]).run(['$rootScope', '$timeout', '$location', function($rootScope, $timeout, $location) {

    // Set Loader
    $rootScope.appLoader = true; // Shows loader
   	// Set Active View 
   	var path = function() { 
   		return $location.path();
   	};
   	// Set 'Active Page'
   	$rootScope.$watch(path, function(newVal, oldVal) {
    	 $rootScope.activePage = newVal;
   	});

}]);

// ===============
// Truncate Filter
// ===============

angular.module("app")
.filter('truncate', function () {
    return function (text, length, end) {
    	// Check
    	if(text) {
    		// Set 'Length, End'
    		var length = length,
    		    end = '...';
    		// Check
    		if(text.length <= length) {
    			// Set
    			return text;
    		} else {
				  // Set
    			return String(text).substring(0, length) + end;
    		}
    	}
    };
});

// ==========
// App Router
// ==========

angular.module("app").component("coreApp", {
		// Template
    templateUrl:"/modules/app/app.comp.html",	
    $routeConfig: [
      // Public
			{ path:"/", component:"index", name:"Root" },
			// Redirect (redirectTo:["Root"])
			{ path:"/**", redirectTo:["Root"] } 
    ]
});
