/**
 * Created by pkdo1 on 11/30/2015.
 */
angular.module('mainCtrl', ['authService'])

.controller('MainController', function($rootScope, $location, Auth){

    var vm = this;
    vm.loginData = {};
    vm.loginData.username = "";
    vm.loginData.password = "";
    vm.loggedIn = Auth.lsLoggedIn();

    $rootScope.$on('$stateChangeStart', function () {
        vm.LoggedIn = Auth.lsLoggedIn();
        if(vm.LoggedIn){
            Auth.getUser()
                .then(function (data) {
                    vm.user = data.data;
                });

        }

    });


    vm.doLogin  =  function(){
        if(vm.validate ()){

            vm.processing = true;

            vm.error = '';

            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function(data){
                    vm.processing = false;

                    Auth.getUser()
                        .then(function (data) {
                            vm.user = data.data;
                        });

                    if(data.success){

                        if(!vm.loggedIn)
                            vm.loggedIn = !vm.loggedIn;

                        vm.loginData.username = "";
                        vm.loginData.password = "";
                        $location.path('/');
                    }

                    else
                        vm.error = data.message;
                });
        }


    };


    vm.doLogout = function(){
        Auth.logout();
        vm.loggedIn = !vm.loggedIn;
        $location.path('/logout');
    };

    vm.validate = function(){

        if(vm.loginData.username == "" || vm.loginData.username == undefined ){
            console.log("No User Name");
            vm.error = "No User Name";
            return false;
        }
        else if(vm.loginData.password == "" || vm.loginData.password == undefined){
            console.log("No Password");
            vm.error = "No Password";
            return false;
        }

        return true;
    }
});