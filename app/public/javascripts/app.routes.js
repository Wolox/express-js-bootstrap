angular.module('app-angular').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('client');
    });

    // Now set up the states
    $stateProvider
      .state('client', {
        url: '/client',
        views: {
          main: {
            templateUrl: 'client.html',
            controller: 'ClientController',
            controllerAs: 'clientCtrl'
          }
        }
      })
      .state('anotherClient', {
        url: '/anotherClient',
        views: {
          main: {
            templateUrl: 'anotherClient.html',
            controller: 'AnotherClientController',
            controllerAs: 'anotherClientCtrl'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
