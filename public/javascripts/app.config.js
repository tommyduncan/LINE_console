angular.module('LINE_console').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/', 
            templateUrl: '/templates/main.html'
        })
        .state('account-list', {
            url: '/accounts', 
            templateUrl: '/templates/accounts.html'
        })
        .state('text-message', {
            url: '/textMessage', 
            templateUrl: '/templates/textMessage.html', 
            controller: 'TextMessageController'
        })
        .state('image-message', {
            url: '/imageMessage', 
            templateUrl: '/templates/imageMessage.html', 
            controller: 'ImageMessageController'
        });
});