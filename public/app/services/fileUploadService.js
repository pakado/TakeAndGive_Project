/**
 * Created by pkdo10 on 1/30/2016.
 */
angular.module('fileUploadService',[])
    .service('fileUpload', function($http){

        this.getAllImagesPerUser = function(username){
            return $http.get('/api/imageperuser/:' + username ,{
                username: username
            })
            .success(function(data){
                    return data;
            });
        };

        this.getAllImages = function(){
            return $http.get('/api/image', {})
            .success(function(data){
                return data;
            });
        };

        this.deleteImage = function(_id){
            return $http.delete('/api/delete/' + _id).success( function(data){
                return data;
            });
        };

        this.updateImage = function(_id, username){
            return $http.put('/api/updateImage/' + _id, {
                userRequest : username
            }).success(function(data){
                return data;
            })

        }
});