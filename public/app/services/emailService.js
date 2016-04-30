
/**
 * Created by pkdo10 on 4/30/2016.
 */
angular.module('emailService', [])

    .service('sendEmail', function($http){

        this.verifyEmail = function(email){
            return $http.post('api/email', {
                email: email
            }).success(function(data){
                return data;
            })
        };
        this.sendPassword = function(userData){
            return $http.post('api/sendPassword',userData);
        }
    });