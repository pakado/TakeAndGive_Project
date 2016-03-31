/**
 * Created by pkdo10 on 3/22/2016.
 */
angular.module('cartCtrl', ['cartService','authService'])

    .controller('cartController', function(getCartImage,Auth){
        var vm = this;
        vm.userDetails = {};

        var refresh =  function () {
            vm.LoggedIn = Auth.lsLoggedIn();
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
    });
