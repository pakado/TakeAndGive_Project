/**
 * Created by pkdo10 on 1/30/2016.
 */
angular.module('fileUploadService',[])
    .service('fileUpload', function($http){

        this.getAllImagesPerUser = function(username){
            return $http.get('/api/imageperuser/' + username ,{})
            .success(function(data){
                    return data;
            });
        };

        this.getAllImages = function(username){
            return $http.get('/api/image/' + username , {})
            .success(function(data){
                return data;
            });
        };

        this.deleteImage = function(id){
            return $http.delete('/api/delete/' + id).success( function(data){
                return data;
            });
        };

        this.updateImage = function(id, username){
            return $http.put('/api/updateImage/' + id, {
                userRequest : username
            }).success(function(data){
                return data;
            })
        }
});