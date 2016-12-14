angular.module('app-angular').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('state1');
    });

    // Now set up the states
    $stateProvider
      .state('state1', {
        url: '/state1',
        views: {
          content: {
            templateUrl: '../app/components/centered/component1/component1.html',
            controller: 'Component1Controller',
            controllerAs: 'comp1Ctrl'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
