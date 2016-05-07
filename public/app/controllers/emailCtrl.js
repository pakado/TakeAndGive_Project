/**
 * Created by pkdo10 on 4/30/2016.
 */
angular.module('emailCtrl', ['emailService','authService'])

    .controller('emailController',function(sendEmail, Auth , AuthToken){

       var vm = this;
        vm.email = '';
        vm.sendPasswordToEmail = function(){
            vm.error = "";
            vm.success = "";
            sendEmail.verifyEmail(vm.email).success(function(data){

                if(data.success){
                    AuthToken.setToken(data.token);
                    vm.token = data.token;

                    Auth.getUser()
                        .then(function (data) {
                            vm.user = data.data;
                            vm.user.token = vm.token;
                            sendEmail.sendPassword(vm.user).then(function(data){
                                if(data.data.success){
                                    Auth.logout();
                                    vm.success = "Success to rest password check your email";
                                    vm.error = "";
                                }else{
                                    vm.error = "Not success to send, The email not exist";
                                    console.log(data.data.error.response);
                                }
                            });

                        });

                }else if( vm.email == false){
                    vm.error = "Please insert email";
                }else{
                    vm.error = "User do not exist";
                }
            });
        }
    });