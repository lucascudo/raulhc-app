angular.module('starter.controllers', [
    'ionic-datepicker',
    'starter.services'
])
.controller('AgendaCtrl', function($ionicLoading, $scope, RaulFactory) {
    var loadAgenda = function (date) {
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2);
        $ionicLoading.show({ template: 'loading' });
        RaulFactory.getAgenda({ "date": date }, function (agenda) {
            $scope.agenda = agenda.eventos;
            $ionicLoading.hide();
        });
    };
    
    $scope.datepickerObject = {
      titleLabel: 'Selecione uma data',  //Optional
      todayLabel: 'Hoje',  //Optional
      closeLabel: 'Fechar',  //Optional
      setLabel: 'Aplicar',  //Optional
      inputDate: new Date(),    //Optional
      weekDaysList: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],   //Optional
      monthList: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      from: new Date(),   //Optional
      callback: function (date) {    //Mandatory
        if (typeof date !== "undefined") {
            loadAgenda(date);
        }
      }
    };
    
    loadAgenda(new Date());
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
