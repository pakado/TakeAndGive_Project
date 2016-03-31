/**
 * Created by pkdo10 on 3/26/2016.
 */
angular.module('rentingService', [])

    .service('rentingImages', function($http){

        this.all = function(username){
            return $http.get('/api/getRentingImages/' + username).success( function(data){
                return data;
            });
        }
    });