/**
 * Created by pkdo1 on 11/30/2015.
 */

angular.module('MyApp', ['uiRouterApp','mainCtrl','userCtrl','storyCtrl','example','fileUpload','cartCtrl','permissionCtrl','angular-toArrayFilter'])
    .run(function($window, $location){
        var idleTime = 0;

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
            if (idleTime > 3333) { // 5 minutes
                var token = $window.localStorage.getItem('token');
                if(token){
                    $window.localStorage.removeItem('token');
                    $location.path('/');
                    window.location.reload();
                }

            }
        }
    })
    .config(function ($httpProvider,$compileProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);

});
