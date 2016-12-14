angular.module('app-angular').config([
  '$translateProvider',
  function ($translateProvider) {

    $translateProvider.translations('es', {
      DAYS_OF_WEEK: {
        SUNDAY: 'Domingo',
        MONDAY: 'Lunes',
        TUESDAY: 'Martes',
        WEDNESDAY: 'Miércoles',
        THURSDAY: 'Jueves',
        FRIDAY: 'Viernes',
        SATURDAY: 'Sabado'
      }
    });
    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy(null);
  }
]);
