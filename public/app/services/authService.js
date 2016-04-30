/**
 * Created by pkdo1 on 11/30/2015.
 */
angular.module('authService', [])

    .service('Auth', function($http, $q, $window, AuthToken){

        this.login = function(username, password){

            return $http.post('/api/login', {
                username: username,
                password: password
            })
            .success(function(data){
                AuthToken.setToken(data.token);
                return data;
            })
        };

        this.setTokenAuth = function(token){
            AuthToken.setToken(token);
            return token;
        };
        this.logout = function(){
            AuthToken.setToken();
        };

        this.lsLoggedIn = function(){
            if(AuthToken.getToken())
                return true;
            else
                return false;
        };

        this.getUser = function(){
            if(AuthToken.getToken())
                return $http.get('/api/me');
            else
                return $q.reject({ message: "User has no token"});
        };

    })

    .service('AuthToken', function($window){

        this.getToken = function(){
            return $window.localStorage.getItem('token');
        };

        this.setToken = function(token){

            if(token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');

        };

    })


    .service('AuthInterceptor', function($q, $location, AuthToken){

        this.request = function(config){

            var token = AuthToken.getToken();

            if(token){
                config.headers['x-access-token'] = token;
            }

            return config;
        };

        this.responseError = function(response){

            if(response.status == 403)
                $location.path('/login');
            return $q.reject(response);

        };

    });

