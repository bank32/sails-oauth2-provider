'use strict';

angular.module('authenApp', []);
angular.module('usersApp', ['ngStorage', 'authenApp'])
	.constant('AUTH_URL', '/oauth/token')
	.constant('CLIENT_ID', 'gOqwK4FSpIW1wUEXSlg6tHNUGpTB4biZ');