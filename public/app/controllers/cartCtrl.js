/**
 * Created by pkdo10 on 3/22/2016.
 */
angular.module('cartCtrl', ['cartService','permissionService','authService'])

    .controller('cartController', function(getCartImage,Auth,getPermissionImage){
        var vm = this;
        vm.userDetails = {};

        var refresh =  function () {
            vm.LoggedIn = Auth.lsLoggedIn();
            /*time in cart
            getCartImage.validateImageTime().success(function(data){
                var data = data;
            });*/
            if(vm.LoggedIn){
                Auth.getUser().success(function (data) {
                    vm.userDetails = data;
                    getCartImage.all(vm.userDetails.username).success(function (data) {
                        vm.userCart = data;
                    });
                });
            }
        };

        refresh();

        vm.cancel = function(id){
            if(confirm("Do you went to cancel")){
                getPermissionImage.responseFalse(id).success( function(data){
                    alert("Success to cancel");
                    refresh();
                });
            }
        };

    });
