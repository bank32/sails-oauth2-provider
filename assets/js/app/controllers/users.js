var usersApp = angular.module('usersApp');

usersApp.controller("users", function ($scope, $http, $localStorage, AUTH_URL, CLIENT_ID) 
{
    var HEADERS = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    var AUTH_URL = AUTH_URL,
        CLIENT_ID = CLIENT_ID;

    $scope.register_users = function(data)
    {
        var objUser = {
            email: $scope.email,
            username: $scope.username,
            password: $scope.password
        }

        $http({
            method: "POST",
            url: '/register',
            headers: HEADERS,
            data: objUser,
            transformRequest: function(obj) 
            {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        })
        .success(function(data, status, headers, config) 
        {
            $http.get(data.url)
            .success(function(data) 
            {
                window.location = "/login";
            });
        });
    }

    $scope.authenticate = function () 
    {
        var data = {
            grant_type: 'password',
            client_id: CLIENT_ID,
            username: $scope.username,
            password: $scope.password
        }

        //Clear away previous token
        delete $localStorage.token;

        $http({
            method: "POST",
            url: AUTH_URL,
            headers: HEADERS,
            data: data,
            transformRequest: function(obj) 
            {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        })
        .success($scope.authenticateSuccess)
        .error($scope.authenticateError);
    };


    /**
    * @function authenticateSuccess
    */
    $scope.authenticateSuccess = function (data) 
    {
        $localStorage.token = data.access_token;

        $http.get('/users/current')
        .success(function(data) 
        {
            console.log('Logged in');
            console.log(data);
        });

        alert('Logged in!');
    };

    /**
    * @function authenticateError
    */
    $scope.authenticateError = function () 
    {
        // Handle login errors here
        console.log('Login fail');
        alert('Invalid username or password');
    };
});