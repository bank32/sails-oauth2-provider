'use strict';

var authenApp = angular.module('authenApp');
    
authenApp.factory('authInterceptor', function ($q, $localStorage) 
{
    return {
        request: function (config) 
        {
            config.headers = config.headers || {};
            if ($localStorage.token) 
            {
                config.headers.Authorization = 'Bearer ' +  $localStorage.token;
            }
            return config || $q.when(config);
        },

        requestError: function(error)
        {
            alert('Error processing requestErrorest!')
            return $q.reject(error);
        },

        response: function (response) 
        {
            //Possibly modify responses
            return response || $q.when(response);;
        },

        responseError: function(error)
        {
            if (error.status == 401) 
            {
                alert('Request is unauthorized!');
            }

            //Handle other common errors
            return $q.reject(error);
        }
    };
}) // End of factory

authenApp.config(function ($httpProvider) 
{
    $httpProvider.interceptors.push('authInterceptor');
});