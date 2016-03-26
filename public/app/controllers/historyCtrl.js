/**
 * Created by pkdo10 on 3/26/2016.
 */
angular.module('historyCtrl', ['authService', 'historyService'])

    .controller('historyController', function(Auth, historyImages){

        var vm = this;

        var refresh = function(){

            Auth.getUser().success( function(data){
                vm.username = data.username;

                historyImages.all(vm.username).success( function(data){
                    vm.images = data;
                })
            })
        };

        refresh();
    });