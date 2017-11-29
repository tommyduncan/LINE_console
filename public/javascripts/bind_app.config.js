angular.module('bind_app').config(['$ionicConfigProvider', '$stateProvider', '$urlRouterProvider', function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/bind_app/index.html',
            controller: 'IndexController'
        })
        .state('done', {
            url: '/done',
            templateUrl: 'templates/bind_app/done.html'
        });
        
    $ionicConfigProvider.navBar.alignTitle('center');
}]);