/**
 * Created by pkdo1 on 12/1/2015.
 */
angular
    .module('uiRouterApp',[
        'ui.router'
    ])
    .config( function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/pages/home.html',
                controller: "upController as up"
            })
            .state('profile', {
                url: '/profile',
                templateUrl:'app/views/pages/profile.html',
                controller: 'changeDetailsController as changeDetails'
            })
            .state('cart',{
                url: '/cart',
                templateUrl: 'app/views/pages/cart.html',
                controller: "cartController as cart"
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/pages/login.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/pages/signup.html',
                controller: "UserCreateController as user"
            })
            .state('chat', {
                url: '/chat',
                templateUrl: 'app/views/pages/chat.html',
                controller: "chatCtrl as chat"
            })
            .state('permission', {
                url: '/permission',
                templateUrl: 'app/views/pages/permission.html',
                controller: "permissionController as per"
            })
            .state('receive', {
                url: '/receive',
                templateUrl: 'app/views/pages/receive.html',
                controller: "receiveController as receive"
            })
            .state('renting', {
                url: '/renting',
                templateUrl: 'app/views/pages/renting.html',
                controller: "rentingController as renting"
            })
            .state('history', {
                url: '/history',
                templateUrl: 'app/views/pages/history.html',
                controller: "historyController as history"
            })
            .state('testUp', {
                url: '/testUp',
                templateUrl: 'app/views/pages/testUp.html',
                controller: "upController as up"
            })
            .state('myStuff', {
                url: '/myStuff',
                templateUrl: 'app/views/pages/myStuff.html',
                controller: "upController as up"
            });

        $urlRouterProvider.otherwise('/');

    } );