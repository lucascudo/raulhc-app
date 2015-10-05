angular.module('starter.controllers', [
    'ionic-datepicker',
    'starter.services'
])
.controller('AgendaCtrl', function($ionicLoading, $scope, RaulFactory) {
    var loadAgenda = function (date) {
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2);
        $ionicLoading.show({ template: 'loading' });
        RaulFactory.getAgenda({ "date": date }, function (agenda) {
            $scope.agenda = agenda.eventos.reverse();
            $ionicLoading.hide();
        });
    };
    
    $scope.goOutside = function (url) {
        window.open(url, '_blank');
    };
    
    $scope.datepickerObject = {
      titleLabel: 'Selecione uma data',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      setLabel: 'Aplicar',
      inputDate: new Date(),
      weekDaysList: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthList: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      from: new Date(),
      callback: function (date) {
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
