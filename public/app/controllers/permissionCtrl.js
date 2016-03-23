/**
 * Created by pkdo10 on 3/23/2016.
 */
angular.module('permissionCtrl', ['permissionService','authService'])

    .controller('permissionController', function(Auth,getPermissionImage){
        var vm = this;

        var refresh = function(){
            Auth.getUser().success( function(data){
                vm.username = data.username;
                getPermissionImage.all(vm.username).success( function(data){
                    vm.images = data;
                });
            });
        };

        refresh();

        vm.responseFalse = function(id){
            if(confirm("Do you went to deny the request")){
                getPermissionImage.responseFalse(id).success( function(data){
                    alert("Success to deny the item");
                    refresh();
                });
            }
        };

        vm.responseTrue = function(id){
            if(confirm("Do you went to confirm")){
                getPermissionImage.responseTrue(id).success( function(data){
                    alert("Success to send the item");
                    refresh();
                });
            }
        }

    });