/**
 * Created by pkdo10 on 3/23/2016.
 */
angular.module('permissionService', [])

    .service('getPermissionImage', function($http){

        this.all = function(username){
            return $http.get('/api/getPermissionImage/' + username,{}).success( function(data){
                return data;
            });
        };

        this.responseFalse = function(id){
            return $http.put('/api/updateImage/' + id, {
                flag: '0'
            }).success( function(data){
                return data;
            });
        };

        this.responseTrue = function(id){
            return $http.put('/api/updateImage/' + id, {
                flag: '1'
            }).success( function(data){
                return data;
            });
        }
    });
