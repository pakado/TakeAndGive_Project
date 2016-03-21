/**
 * Created by pkdo10 on 1/26/2016.
 */
angular.module('fileUpload', ['ngFileUpload','fileUploadService'])
    .controller('upController',['Upload','$window','fileUpload','Auth',function(Upload,$window,fileUpload,Auth){

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


        vm.getImages = function(){
            fileUpload.getAllImagesPerUser(vm.imageDetails.username).success(function(data){
                vm.images = data;
            });
        };

        vm.delete = function(id){
            if(confirm("Are you sure you want to delete the photo") == true){
                fileUpload.deleteImage(id).success(function(){
                    console.log("You deleted a photo");
                    vm.getImages();
                    alert("The Photo deleted")
                });
            }else{
                console.log("You've canceled the deleted of the picture");
            }

        }

}]);