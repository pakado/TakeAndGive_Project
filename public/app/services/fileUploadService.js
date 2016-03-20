/**
 * Created by pkdo10 on 1/30/2016.
 */
angular.module('fileUploadService',[])
    .service('fileUpload', function($http){

      /*  this.uploadImage = function(imageDetails){
          //  return $http.post('/api/uploadImage',imageDetails);
            return $http.post('/uploadImage',imageDetails);
        };*/

        this.getAllImagesPerUser = function(username){
           // return $http.post('/api/images',{
            return $http.get('/api/imageperuser/:'+username,{
                username: username
            })
            .success(function(data){
                    return data;
            });
        };

        this.getAllImages = function(){
            //return $http.get('/api/images')
            return $http.get('/api/image', {

            })
                .success(function(data){
                return data;
            });
        };
});