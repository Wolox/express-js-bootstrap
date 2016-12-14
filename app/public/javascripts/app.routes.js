angular.module('app-angular').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('default');
    });

    // Now set up the states
    $stateProvider
      .state('default', {
        url: '/default',
        views: {
          main: {
            templateUrl: 'client.html',
            controller: 'ClientController',
            controllerAs: 'clientCtrl'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
