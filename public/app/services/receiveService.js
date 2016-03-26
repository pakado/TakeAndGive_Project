/**
 * Created by pkdo10 on 3/26/2016.
 */
angular.module('receiveService', [])

    .service('receiveImages', function($http){

        this.all = function(username){
            return $http.get('/api/getReceiveImages/' + username).success( function(data){
                return data;
            });
        }
    });