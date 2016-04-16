/**
 * Created by pkdo10 on 3/26/2016.
 */
angular.module('historyService', [])

    .service('historyImages', function($http){

        this.all = function(username){
            return $http.get('/api/getHistoryImages/' + username).success( function(data){
                return data;
            })
        }
    });