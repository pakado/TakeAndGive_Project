/**
 * Created by pkdo1 on 11/30/2015.
 */

<<<<<<< HEAD
angular.module('MyApp', ['uiRouterApp','mainCtrl','userCtrl','storyCtrl','example','fileUpload','cartCtrl','permissionCtrl','receiveCtrl','historyCtrl','rentingCtrl','chatApp','yourAppModule','angular-toArrayFilter'])
=======
angular.module('MyApp', ['uiRouterApp','mainCtrl','userCtrl','storyCtrl','example','fileUpload','cartCtrl','permissionCtrl','receiveCtrl','historyCtrl','rentingCtrl','yourAppModule','angular-toArrayFilter'])
>>>>>>> 09d563681296f357a04692475eb9c24f67d35084
    .run(function($window, $location){
        var idleTime = 0;
        console.log("Start in :" + new Date());
        var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

        //Zero the idle timer on mouse movement.
        window.addEventListener('mousemove',function (e) {
            idleTime = 0;
        });
        window.addEventListener('keypress', function (e) {
            idleTime = 0;
        });

        function timerIncrement(){
            idleTime = idleTime + 1;
            if (idleTime > 15) { // 6 minutes
                var token = $window.localStorage.getItem('token');
                if(token){
                    $window.localStorage.removeItem('token');
                    window.location.reload();
                    console.log("End in :" + new Date());
                    console.log("The user logout :" + new Date());
                }
            }
        }
    })
    .config(function ($httpProvider,$compileProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);

});
