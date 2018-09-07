angular.module('LINE_console').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/', 
            templateUrl: '/templates/main.html'
        })
        .state('members', {
            url: '/members', 
            templateUrl: '/templates/members.html', 
            controller: 'MembersController'
        })
        .state('text-message', {
            url: '/sendMessage', 
            templateUrl: '/templates/sendMessage.html', 
            controller: 'SendMessageController'
        })
        .state('image-message', {
            url: '/imageMessage', 
            templateUrl: '/templates/imageMessage.html', 
            controller: 'ImageMessageController'
        });
});