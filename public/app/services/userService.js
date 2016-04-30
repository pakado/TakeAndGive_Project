/**
 * Created by pkdo1 on 12/5/2015.
 */
angular.module('userService', ['authService'])

    .service('User', function($http,AuthToken){

        this.create = function(userData){
            return $http.post('/api/signup', userData);
        };

        this.all = function(){
            return $http.get('/api/users');
        };

        this.sendMailWelcome = function(userData){
            return $http.post('/api/handleSayHello', userData);
        };
        //Update user into DB
        this.changeDetails = function(user){

            return $http.put('/api/update:'+user.id, {
                user : user
            })
                .success(function(data){
                    AuthToken.setToken(data.token);
                    return data;
                })
        };

});
