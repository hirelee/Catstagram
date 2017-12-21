(function() {

	// Invoke 'strict' JavaScript mode
	"use strict";

	// 'Index Component' on 'App Module'
	var module = angular.module("app");

	// Component
	module.component("index", {
		templateUrl:"/modules/public/index/index.comp.html",
		bindings: {
    		"$router":"<"
    	},
		controllerAs:"model",
		controller:[ '$http', '$document', '$route', '$rootScope', '$scope', '$timeout', '$window', '$location', '$q', indexController]
	});

	// ==========
	// Controller
	// ==========

	function indexController($http, $document, $route, $rootScope, $scope, $timeout, $window, $location, $q) {
	
		// Set 'This'
		var model = this;
		// Set 'Profile'
		model.profile = {
			username:'Garfield',
			avatar:'',
			about:'All I do is eat and sleep. Eat and sleep. Eat and sleep. There must be more to a cat’s life than that. But I hope not. <span class="aboutTag">#Sleep</span> <span class="aboutTag">#Catnip</span> <span class="aboutTag">#CatLife</span> <span class="aboutTag">#Sleep</span>',
			stats: [
				{ key:'Posts', value:'0' },
				{ key:'Followers', value:'424' },
				{ key:'Following', value:'102' },
			],
			follow:false
		};
		// Set 'Path'
		model.path = 'https://raw.githubusercontent.com/tailify/dev-test-api/master/public/';
		// Set 'Animate'
		model.animate = {
			page:'pageInactive',
			analytics:false,
			analyticsSwitch:false,
			like:false,
			comments:false
		};
		// Set 'Popup'
		model.popup = {
			img:'',
			css:'',
			prompt: {
				active:false,
				status:'',
				title:'',
				text:''
			}
		};
		// Set 'Analytics'
		model.analytics = {
			month:[
				{ day:1, likes:235, comments:12 },				
				{ day:2, likes:890, comments:22 },				
				{ day:3, likes:1321, comments:52 },				
				{ day:4, likes:1789, comments:74 },				
				{ day:5, likes:2490, comments:88 },				
				{ day:6, likes:3165, comments:102 },				
				{ day:7, likes:4101, comments:201 },				
				{ day:8, likes:5112, comments:223 },				
				{ day:9, likes:6401, comments:283 },				
				{ day:10, likes:7891, comments:348 },				
				{ day:11, likes:10219, comments:419 },				
				{ day:12, likes:12901, comments:570 },				
				{ day:13, likes:14736, comments:701 },				
				{ day:14, likes:16782, comments:890 },				
			],
			monthLikesTotal:0,
			monthCommentsTotal:0,
			countries: [
				{ country:'uk', value:'642,630.94', percentage:34 },
				{ country:'france', value:'510,324.57', percentage:27 },
				{ country:'germany', value:'226,810.92', percentage:12 },
				{ country:'russia', value:'302,414.56', percentage:16 },
				{ country:'latvia', value:'37,801.82', percentage:2 },
				{ country:'kongo', value:'170,108.19', percentage:9 },
			],
			sex: [
				{ key:'male', value:29 },
				{ key:'female', value:71 }				
			],
			age: [
				{ key:'>14',   value:14.20 },
				{ key:'15-24', value:22.70 },
				{ key:'25-34', value:41.80 },
				{ key:'35-44', value:19.10 },
				{ key:'45+',   value:2.20 },
			],
			totals: [
				{ key:'Total Reach', value:'1,890,091' },
				{ key:'Total Posts', value:'6' },
				{ key:'Total Influencers', value:'3' },
			]
		};
		// Set 'Comment' and  'Comments'
		model.comment = '';
		model.comments = [];
		// Set 'Data'
		model.data = '';
		
		/**
		*
		* OnInit 
		*
		* @method angular element
		* @param {null} 
		* @return {null} Fetch User Images
		*
		*/		

		model.$onInit = function(next) {
			// Get
			$http({
			  method: 'GET',
			  url: 'https://devtest.tailify.com/api/list/'
			}).then(function successCallback(res) {
				// Set 'Data'
				model.data = res.data;
				// Set 'Profile Avatar'
				model.profile.avatar = 'https://raw.githubusercontent.com/tailify/dev-test-api/master/public/'+res.data[1].path;
				// Set 'Profile Stats Posts'
				model.profile.stats[0].value = res.data.length;
			}, function errorCallback(res) {
			 	console.log('Something has gone wrong');
			})
			// Set 'Totals'
			for (var i = 0; i < model.analytics.month.length; i++) { 
	    		model.analytics.monthLikesTotal  += model.analytics.month[i].likes;
	    		model.analytics.monthCommentsTotal += model.analytics.month[i].comments;
			};
			// Hide 'App Loader'
			$timeout(function() {
				$rootScope.appLoader = false;
			}, 200);
			// Set 'Page Active'
			$timeout(function() {
				model.animate.page = 'pageActive';
			}, 400);
		}

		/**
		* 
		* Toggle Popup
		*
		* @method togglePopup
		* @param {img} 
		* @return {null} Shows Selected User Image (Calls API)
		*
		*/

		model.togglePopup = function(img) {
			// Set 'Body'
			var bodyRef = angular.element($document[0].body);
			// Check 'Reset'
			if(img == 'reset') {
				// Reset 'Scroll'
				bodyRef.removeClass('noScroll');
				// Reset 'Css'
				model.popup.css = '';
				// Set 'Page Active'				
				$timeout(function() {
					model.animate.page = 'pageActive';
				}, 200);
				// Reset 'Img'
				$timeout(function() {
					model.popup.img = '';
					model.comments = [];
					// Animations
					model.animate.comments = false;
					model.animate.like = false;
				}, 400);
				// Reset 'Prompt'
				model.popup.prompt.active = false;
				// Return
				return false;
			}
			// Post
			$http({
			  	method: 'POST',
			  	url: 'https://devtest.tailify.com/api/upload/',
			  	data: { 
					filename:img,
			  		pastebin_api_key: 'd57e3eee19fd5c3ad3ed21b8912a3bce'
				}
			}).then(function successCallback(res) {
				// Set Prompt
				model.popup.prompt.active = true;
				model.popup.prompt.status = 200;
				model.popup.prompt.title = 'Perrrrfect,';
				model.popup.prompt.text = res.data.uri+' uploaded just fine.';
				// Set 'Image'
				$timeout(function() {
					model.popup.img = img;
				},200);
				// Reset 'Prompt'
				$timeout(function() {
					model.popup.prompt.active = false;
				}, 2500);
			}, function errorCallback(res) {
			    // Set Prompt
				model.popup.prompt.active = true;
				model.popup.prompt.status = 500;
				model.popup.prompt.title = 'Hissss';
				model.popup.prompt.text = res.data.message+'.';
				// Set 'Image'
				$timeout(function() {
					model.popup.img = img;
				},200);
				// Reset 'Prompt'
				$timeout(function() {
					model.popup.prompt.active = false;
				}, 2500);
			});
			// Set 'Page Inactive'
			model.animate.page = 'pageInactive';
			// Set 'Popup Css'
			$timeout(function() {
				model.popup.css = 'userPopupImageActive';
			}, 200);
			// Prevent 'Body Scroll'
			bodyRef.addClass('noScroll');
		}

		/**
		* 
		* Toggle Follow
		*
		* @method toggleFollow
		* @param {null} 
		* @return {null} Follow/Unfollow User
		*
		*/

		model.toggleFollow = function() {
			// Check
			if(model.profile.follow) {
				// Set
				model.profile.follow = false;  
			} else {
				// Set
				model.profile.follow = true;  
			}
		}

		/**
		* 
		* Insert Comment
		*
		* @method insertComment
		* @param {null} 
		* @return {null} Comment on User Image
		*
		*/

		model.insertComment = function() {
			model.comments.push({data:model.comment});
			model.comment = '';
		}

		/**
		* 
		* Toggle Comments
		*
		* @method toggleComments
		* @param {null} 
		* @return {null} Toggle User Image Comments
		*
		*/

		model.toggleComments = function() {
			// Check
			if(model.animate.comments) {
				// Set
				model.animate.comments = false;
			} else {
				// Set
				model.animate.comments = true;
			}
		}

		/**
		* 
		* Toggle Like
		*
		* @method toggleLike
		* @param {null} 
		* @return {null} Like/Unlike User Image
		*
		*/

		model.toggleLike = function() {
			// Check
			if(model.animate.like) {
				// Set
				model.animate.like = false;
			} else {
				// Set
				model.animate.like = true;
			}
		}

		/**
		* 
		* Toggle Analytics
		*
		* @method toggleAnalytics
		* @param {null} 
		* @return {null} Shows User Stats
		*
		*/

		model.toggleAnalytics = function() {
			// Set 'Body'
			var bodyRef = angular.element($document[0].body);
			// Check
			if(model.animate.analytics) {
				// Reset 'Scroll'
				bodyRef.removeClass('noScroll');
				// Set 'Animate'
				model.animate.analytics = false;
				// Set 'Page Active'				
				$timeout(function() {
					model.animate.page = 'pageActive';
				}, 200);
			} else {
				// Prevent 'Scroll'
				bodyRef.addClass('noScroll');
				// Set 'Page Inactive'				
				model.animate.page = 'pageInactive';
				// Set 'Animate'
				$timeout(function() {
					model.animate.analytics = true;
				}, 200);
			}
		}

		/**
		* 
		* Switch Analytics
		*
		* @method switchAnalytics
		* @param {null} 
		* @return {null} Switches Analytics Panels (Mobile/Tablet Only)
		*
		*/

		model.switchAnalytics = function() {
			// Check
			if(model.animate.analyticsSwitch) {
				// Set 'Analytics Switch'
				model.animate.analyticsSwitch = false;
			} else {
				// Set 'Analytics Switch'
				model.animate.analyticsSwitch = true;
			}
		}
		
	}

}());