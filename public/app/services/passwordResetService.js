/**
 * Created by pkdo10 on 5/1/2016.
 */
angular.module('passwordResetService', ['authService'])

    .service('passwordReset', function($http, AuthToken){

        this.passwordReset = function(user){
            return $http.put('api/passwordRest:'+user.id, {
                user : user
            })
            .success(function(data){
                AuthToken.setToken(data.token);
                return data;
            })
        }
    });