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
        .state('textMessage', {
            url: '/textMessage', 
            templateUrl: '/templates/textMessage.html', 
            controller: 'TextMessageController'
        });
});