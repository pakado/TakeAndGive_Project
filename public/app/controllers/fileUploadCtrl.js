/**
 * Created by pkdo10 on 1/26/2016.
 */
angular.module('fileUpload', ['ngFileUpload','fileUploadService'])
    .controller('upController',['Upload','$window','fileUpload','Auth',function(Upload,$window,fileUpload,Auth,$scope){

        var vm = this;
        var user;
        vm.imageDetails = {};
        vm.imageDetails.category= "";
        vm.imageDetails.size= "";
        vm.imageDetails.toUse = "";
        vm.imageDetails.username = "";
        vm.error= "";
        vm.allImages = {};
        vm.images = {};

        (function(){

            Auth.getUser()
                .then(function (data) {
                    user = data.data;
                    vm.imageDetails.username =  user.username;
                    if(location.hash == "#/myStuff"){
                        vm.getImages(vm.imageDetails.username);
                    }
                    else{
                        fileUpload.getAllImages().success(function(data){
                        if(data.length > 0) {
                           vm.allImages = data;
                        }
                    });
                   }
                });
        })();


        vm.submit = function(){ //function to call on form submit
            vm.error = "";
            if(vm.imageDetails.category == ""){
                console.log("Need to choose category");
                vm.error = "Need to choose category";
                return;
            }

            if(vm.imageDetails.size == ""){
                console.log("Need to choose size");
                vm.error = "Need to choose size";
                return;
            }


            else if(/*vm.upload_form.file.$valid && */vm.file) { //check if from is valid
                //vm.upload(vm.file); //call upload function
            }
            else{
                vm.error = "Need to choose image to upload";
            }
        };

       /* vm.upload = function (file) {
            fileUpload.uploadImage(vm.imageDetails, vm.file)
                .then(function(response){
                    console.log("I am in the ctrl of upload"+ response);
                    vm.getImages();
                    vm.imageDetails.category= "";
                    vm.imageDetails.size= "";
                    vm.error ="";
                    vm.file = null;
                });
        };*/

        vm.getImages = function(){
            fileUpload.getAllImagesPerUser(vm.imageDetails.username).success(function(data){
                vm.images = data;
            });
        };
       /* vm.upload = function (file) {

           Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file  http://localhost:3000/upload
                data:{file:file, user: vm.user} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');

                    vm.imageDetails.path = resp.data.req.path;

                    fileUpload.uploadImage(vm.imageDetails)
                        .then(function(response){
                            console.log("I am in the ctrl of upload"+ response);
                            vm.getImages();
                            vm.imageDetails.category= "";
                            vm.imageDetails.size= "";
                            vm.error ="";
                            vm.file = null;
                        });
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };*/
}]);