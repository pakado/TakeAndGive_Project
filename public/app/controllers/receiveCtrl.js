/**
 * Created by pkdo10 on 3/26/2016.
 */
angular.module('receiveCtrl', ['authService','receiveService'])

    .controller('receiveController', function(Auth, receiveImages){

        var vm = this;

        var refresh = function(){
            Auth.getUser().success( function(data){
                vm.username = data.username;
                receiveImages.all(vm.username ).success(function(data){
                    vm.images = data;
                });
            })
        };

        refresh();

    });