angular.module('starter.controllers', [ 'ionic-datepicker' ])

.controller('AgendaCtrl', function ($ionicLoading, $scope, RaulFactory) {
    var loadAgenda = function (date) {
        $scope.datepickerObject.inputDate = date;
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2);
        $ionicLoading.show({ template: 'loading' });
        RaulFactory.restful.getAgenda({ "date": date }, function (agenda) {
            var needle = "Doc.Sede#ComoChegar";
            for (var i = 0; i < agenda.eventos.length; ++i) {
                if (agenda.eventos[i].endereco.indexOf(needle) > -1) {
                    agenda.eventos[i].endereco = agenda.eventos[i].endereco.replace(needle, "");
                    agenda.eventos[i].enderecoUrl = "http://raulhc.cc/Doc/Sede#ComoChegar";
                }
            }
            agenda.eventos = agenda.eventos.reverse();
            $scope.agenda = agenda;
            $ionicLoading.hide();
        }, function (error) {
            console.log(error);
            $scope.agenda = [];
            $ionicLoading.hide();
        });
    };
    
    $scope.datepickerObject = {
      titleLabel: 'Selecione uma data',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      setLabel: 'Aplicar',
      weekDaysList: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthList: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      callback: function (date) {
        if (typeof date !== "undefined") {
            loadAgenda(date);
        }
      }
    };
    
    loadAgenda(new Date());
})

.controller('ChatCtrl', function ($rootScope, $state) {
    $rootScope.goOutside("https://webchat.freenode.net/?channels=raulhc");
    $state.go("tab.doar");
})

.controller('ContatoCtrl', function ($rootScope, $state) {
    $rootScope.goOutside("mailto:contato@raulhc.cc", "_system");
    $state.go("tab.doar");
})

.controller('DoarCtrl', function ($ionicLoading, $scope, RaulFactory) {
    $ionicLoading.show({ template: 'loading' });
    RaulFactory.local.getHelpAppeal(function (phrase) {
        $scope.helpAppeal = phrase;
        $ionicLoading.hide();
    });
})

.controller('TemGenteCtrl', function ($ionicLoading, $scope, RaulFactory) {
    $ionicLoading.show({ template: 'loading' });
    RaulFactory.ajax.getTemGente(function (res) {
        $scope.temGente = res.data;
        $ionicLoading.hide();
    }, function (error) {
        console.log(error);
        $scope.temGente = "";
        $ionicLoading.hide();
    });
});
