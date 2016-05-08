/**
 * Created by pkdo10 on 1/26/2016.
 */
angular.module('fileUpload', ['ngFileUpload','fileUploadService'])
    .controller('upController',['$scope','Upload','$window','$location','fileUpload','Auth',function($scope,Upload,$window,$location,fileUpload,Auth) {

        var vm = this;
        var user;
        vm.imageDetails = {};
        vm.imageDetails.category = "";
        vm.imageDetails.size = "";
        vm.imageDetails.toUse = "";
        vm.imageDetails.username = "";
        vm.error = "";
        vm.allImages = {};
        vm.images = {};
        vm.isShoe = false;
        vm.noImage = true;
        vm.error = location.hash;
        if(vm.error == "#/myStuffError"){
            vm.error = "the image it too big the size need to be less then 2 mb";
        }else
            vm.error = "";

        var refresh =  function () {

            Auth.getUser()
                .then(function (data) {
                    user = data.data;
                    vm.imageDetails.username = user.username;
                    if (location.hash == "#/myStuff") {
                        vm.getImagesPerUser(vm.imageDetails.username);
                    }
                    else {
                        fileUpload.getAllImages(vm.imageDetails.username).success(function (data) {
                            if (data.length > 0) {
                                vm.noImage = false;
                                vm.allImages = data;
                            }
                        });
                    }
                });
        };

        refresh();

        vm.uploadImage = function () { //function to call on form submit
            vm.error = "";

            if (vm.imageDetails.toUse == "" || vm.imageDetails.toUse == undefined) {
                console.log("Need to choose purpose");
                vm.error = "Need to choose purpose";
                return;
            }

            else if (vm.imageDetails.category == "" || vm.imageDetails.category == undefined) {
                console.log("Need to choose category");
                vm.error = "Need to choose category";
                return;
            }

            else if (vm.imageDetails.size == "" || vm.imageDetails.size == undefined) {
                console.log("Need to choose size");
                vm.error = "Need to choose size";
                return;
            }

            else if (/*vm.upload_form.file.$valid && */vm.file) { //check if from is valid
                //vm.upload(vm.file); //call upload function
                vm.error = "";
            }
            else if(vm.file == undefined){
                vm.error = "the image it too big the size need to be less then 2 mb";
                return;
            }

            else {
                vm.error = "Need to choose image to upload";
            }
        };

        vm.resize = function(dataURL){
            vm.imageDetails.dataURL = dataURL;
            vm.uploadImage();
        };
        vm.isShoes = function(){
            if( vm.imageDetails.category == "Shoes Women" ||  vm.imageDetails.category == "Shoes Men"){
                vm.isShoe = true;
                vm.imageDetails.size = "";
            }
            else{
                vm.isShoe = false;
                vm.imageDetails.size = "";
            }
        };

        vm.getImagesPerUser = function () {
            fileUpload.getAllImagesPerUser(vm.imageDetails.username).success(function (data) {
                if (data.length > 0) {
                    vm.noImage = false;
                    vm.images = data;
                }
            });
        };

        vm.delete = function (id) {
            if (confirm("Are you sure you want to delete the photo") == true) {
                fileUpload.deleteImage(id).success(function () {
                    console.log("You deleted a photo");
                    vm.getImagesPerUser();
                    alert("The Photo deleted")
                });
            } else {
                console.log("You've canceled the deleted of the picture");
            }
        };

        vm.addToCart = function (id) {
            if (confirm("You went to add this photo to your cart?")) {
                fileUpload.updateImage(id, vm.imageDetails.username).success(function (data) {
                    console.log("The image status as change");
                    if(confirm("The photo move to cart, do you went to go to cart")){
                        $location.path('/cart');
                    }else{
                        refresh();
                    }
                });
            } else{
                console.log("You've canceled to add the photo to your cart");
             }
        }
}]);