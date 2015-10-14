angular.module('starter.controllers', [ 'ionic-datepicker' ])

.controller('AgendaCtrl', function ($ionicLoading, $scope, ComponentFactory, RaulFactory) {
    var loadAgenda = function (date) {
        $scope.datepickerObject.inputDate = date;
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2);
        $ionicLoading.show({ template: 'loading' });
        RaulFactory.getAgenda({ "date": date }, function (agenda) {
            $scope.agenda = agenda;
            $ionicLoading.hide();
        }, function (error) {
            console.log(error);
            $scope.agenda = [];
            $ionicLoading.hide();
        });
    };
    
    $scope.datepickerObject = ComponentFactory.getDatepicker(function (date) {
        if (typeof date !== "undefined") {
            loadAgenda(date);
        }
    });
    
    loadAgenda(new Date());
})

.controller('ChatCtrl', function ($ionicLoading, $scope) {
    window.open("https://webchat.freenode.net/?channels=raulhc", "_blank");
})

.controller('ContatoCtrl', function ($rootScope, $state) {
    window.open("mailto:contato@raulhc.cc", "_system");
})

.controller('DoarCtrl', function ($ionicLoading, $scope, RaulFactory) {
    $ionicLoading.show({ template: 'loading' });
    $scope.helpAppeal = RaulFactory.getHelpAppeal();
    $ionicLoading.hide();
})

.controller('TemGenteCtrl', function ($ionicLoading, $scope, RaulFactory) {
    $ionicLoading.show({ template: 'loading' });
    RaulFactory.getTemGente(function (res) {
        $scope.temGente = res.data;
        $ionicLoading.hide();
    }, function (error) {
        console.log(error);
        $scope.temGente = "";
        $ionicLoading.hide();
    });
});
