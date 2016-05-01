/**
 * Created by pkdo10 on 4/30/2016.
 */
angular.module('emailCtrl', ['emailService','authService'])

    .controller('emailController',function(sendEmail, Auth , AuthToken){

       var vm = this;
        vm.email = '';
        vm.sendPasswordToEmail = function(){
            sendEmail.verifyEmail(vm.email).success(function(data){
                AuthToken.setToken(data.token);
                vm.token = data.token;

                Auth.getUser()
                    .then(function (data) {
                        vm.user = data.data;
                        vm.user.token = vm.token
                        sendEmail.sendPassword(vm.user).then(function(data){});
                        if(data.success){
                            Auth.logout();
                            vm.success = "Success to rest password check your email";
                        }else{
                            vm.error = "Not success to send, The email not exist";

                        }
                    });

                    if( vm.email == false){
                        vm.error = "Please insert email";
                        vm.email = "";
                    }
            });
        }
    });