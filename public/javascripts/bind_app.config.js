angular.module('bind_app').config(['$ionicConfigProvider', '$stateProvider', '$urlRouterProvider', function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'templates/bind_app/index.html'/*,
            controller: 'IndexController',
            controllerAs: 'indexCtrl'*/
        });
        
    $ionicConfigProvider.navBar.alignTitle('center');
}]);