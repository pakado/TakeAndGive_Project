/**
 * Created by pkdo10 on 3/26/2016.
 */
angular.module('historyCtrl', ['authService', 'historyService'])

    .controller('historyController', function($rootScope, Auth, historyImages){

        var vm = this;

        var refresh =  function () {
            vm.LoggedIn = Auth.lsLoggedIn();
            if (vm.LoggedIn) {
                Auth.getUser().success(function (data) {
                    vm.username = data.username;

                    historyImages.all(vm.username).success(function (data) {
                        vm.images = data;
                    })
                });
            }
        };

        refresh();
    });