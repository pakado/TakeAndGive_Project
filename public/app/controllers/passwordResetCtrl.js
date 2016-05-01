/**
 * Created by pkdo10 on 4/30/2016.
 */
angular.module('passwordResetCtrl',['authService','passwordResetService'])

    .controller('passwordResetController', function(Auth, passwordReset){

        var vm = this;
        var hash = location.hash;
        vm.user = {};
        vm.user.newPassword = "";
        vm.user.confrimPassword = "";
        vm.flag = false;
        var token = hash.replace("#/passwordReset/",'');
        Auth.setTokenAuth(token);

        Auth.getUser()
            .then(function (data) {
                vm.user = data.data;
            });

        vm.passwordReset = function(){
            if(vm.validate()){
                passwordReset.passwordReset(vm.user)
                    .success(function(data){
                    vm.success = "Success to change password";
                    vm.user.newPassword = "";
                    vm.user.confrimPassword = "";
                    vm.flag = true;
                    Auth.logout();
                }).error(function(data){
                    vm.error = data;
                })
            }
        };

        vm.validate = function(){
            if(vm.user.newPassword == '' || vm.user.newPassword == undefined){
                console.log("No New Password");
                vm.error = "No New Password";
                vm.success = "";
                return false;
            }
            else if(vm.user.confrimPassword == '' || vm.user.confrimPassword == undefined){
                console.log("No Confrim Password");
                vm.error = "No Confrim Password";
                vm.success = "";
                return false;
            }

            else if(vm.user.confrimPassword != vm.user.newPassword){
                console.log("The New password don't mach to the Confrim password");
                vm.error = "The New password don't mach to the Confrim password";
                vm.success = "";
                return false;
            }
            return true;
        };
    });
