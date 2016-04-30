/**
 * Created by pkdo1 on 12/5/2015.
 */
angular.module('userCtrl', ['userService'])

.controller('UserController', function(User){

        var vm = this;

        User.all()
            .success(function(data){
                vm.users = data;
            })

})

.controller('UserCreateController', function(User,$location, $window){

        var vm = this;
        vm.userData = {};
        vm.userData.name = "";
        vm.userData.username = "";
        vm.userData.email = "";
        vm.userData.password = "";
        vm.userData.passwordConfirmation= "";
        vm.userData.country = "Israel";
        vm.userData.city = "";
        vm.userData.sex = "";

        vm.signupUser = function(){
            if(validate(vm,'sign')){
                vm.message = '';

                User.create(vm.userData)
                    .then(function(response){
                        vm.userDataEmail = vm.userData;
                        vm.userData = {};
                        vm.message = response.data.message;

                        if(vm.message == undefined){
                            vm.error = "This User Name Already Exist";
                        }
                        else{
                            $window.localStorage.setItem('token', response.data.token);
                            User.sendMailWelcome(vm.userDataEmail);
                            vm.userData = {};
                            $location.path('/home');
                            window.location.reload();
                        }
                    })
            }
        };



})
.controller('changeDetailsController', function($rootScope,Auth,User){

    var vm = this;

    (function(){
         vm.LoggedIn = Auth.lsLoggedIn();

         Auth.getUser()
         .then(function (data) {
             vm.userData = data.data;
          });
    })();


    vm.changeDetails = function(){
        vm.error = "";
        if(validate(vm, 'changeDetails')){
            User.changeDetails(vm.userData)
                .then(function(response){
                    vm.userData.oldPassword = '';
                    vm.userData.newPassword = '';
                    vm.userData.confrimPassword = '';
                    vm.error = response.data.message;
                });
        }
    }

});

validate = function(vm, status){

    if(vm.userData.name == "" || vm.userData.name == undefined){
        console.log("No Name");
        vm.error = "No Name";
        return false;
    }

   if(status == 'sign'){
        if(vm.userData.username == "" || vm.userData.username == undefined){
               console.log("No User Name");
               vm.error = "No User Name";
               return false;
           }
        else if( vm.userData.email == "" || vm.userData.email == undefined){
            console.log("No Email Or Wrong Syntax");
            vm.error = "No Email Or Wrong Format";
            return false;
        }
       else if( vm.userData.password == "" || vm.userData.password == undefined){
           console.log("No Password");
           vm.error = "No Password";
           return false;
       }
        else if( vm.userData.passwordConfirmation == "" || vm.userData.passwordConfirmation == undefined){
            console.log("Confrim the Password");
            vm.error = "Confrim the Password";
            return false;
        }
        else if(vm.userData.passwordConfirmation != vm.userData.password){
            console.log("The password don't mach to the Confrim password");
            vm.error = "The password don't mach to the Confrim password";
            return false;
        }
        else if(vm.userData.country == "" || vm.userData.country == undefined){
            console.log("Need to choose country");
            vm.error = "Need to choose country";
            return false;
        }
        else if(vm.userData.city == "" || vm.userData.city == undefined){
            console.log("Need to choose city");
            vm.error = "Need to choose city";
            return false;
        }
        else if(vm.userData.sex == "" || vm.userData.sex == undefined){
            console.log("Need to choose gender");
            vm.error = "Need to choose gender";
            return false;
        }
    }
    if(status == 'changeDetails' ){
        if(vm.userData.oldPassword == "" || vm.userData.oldPassword == undefined && vm.userData.newPassword == '' || vm.userData.newPassword == undefined && vm.userData.confrimPassword == '' || vm.userData.confrimPassword == undefined){
            return true;
        }
        else if(vm.userData.oldPassword == "" || vm.userData.oldPassword == undefined){
            console.log("No Old Password");
            vm.error = "No Old Password";
            return false;
        }
        else if(vm.userData.newPassword == '' || vm.userData.newPassword == undefined){
            console.log("No New Password");
            vm.error = "No New Password";
            return false;
        }
        else if(vm.userData.confrimPassword == '' || vm.userData.confrimPassword == undefined){
            console.log("No Confrim Password");
            vm.error = "No Confrim Password";
            return false;
        }

        else if(vm.userData.confrimPassword != vm.userData.newPassword){
            console.log("The New password don't mach to the Confrim password");
            vm.error = "The New password don't mach to the Confrim password";
            return false;
        }
    }

    return true;
};