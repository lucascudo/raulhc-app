angular.module('starter.controllers', ['starter.services'])

.controller('AgendaCtrl', function($ionicLoading, $scope, RaulFactory) {
    $ionicLoading.show({ template: 'loading' });
    RaulFactory.getAgenda({}, function (agenda) {
        $scope.agenda = agenda.eventos;
        $ionicLoading.hide();
    });
})
.controller('TemGenteCtrl', function($ionicLoading, $scope, RaulFactory) {
    /*
    $ionicLoading.show({ template: 'loading' });
    RaulFactory.getTemGente({}, function (temGente) {
        $scope.temGente = temGente;
        $ionicLoading.hide();
    });
    */
});
